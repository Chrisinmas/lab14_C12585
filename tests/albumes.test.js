import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'
import app from '../app.js'
import db from '../data/database.js'

// Limpiar y resembrar antes de las pruebas
beforeAll(() => {
  db.exec('DELETE FROM albumes')
  db.prepare(`
    INSERT INTO albumes (slug, titulo, artista, genero, anio, sello, pistas, imagen, resumen, descripcion)
    VALUES (@slug, @titulo, @artista, @genero, @anio, @sello, @pistas, @imagen, @resumen, @descripcion)
  `).run({
    slug:        'thriller',
    titulo:      'Thriller',
    artista:     'Michael Jackson',
    genero:      'Pop',
    anio:        1982,
    sello:       'Epic',
    pistas:      9,
    imagen:      'thriller.avif',
    resumen:     'El álbum más vendido de la historia.',
    descripcion: 'Álbum de Michael Jackson que redefinió la música pop de los años 80.'
  })
})

// GET /albumes
describe('GET /albumes', () => {
  it('200 y arreglo que contiene un slug sembrado', async () => {
    const res = await request(app).get('/albumes')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.some(a => a.slug === 'thriller')).toBe(true)
  })
})

// GET /album/:slug
describe('GET /album/:slug', () => {
  it('200 y el objeto del álbum cuando el slug existe', async () => {
    const res = await request(app).get('/album/thriller')
    expect(res.status).toBe(200)
    expect(res.body.slug).toBe('thriller')
  })

  it('404 en JSON cuando el slug no existe', async () => {
    const res = await request(app).get('/album/no-existe')
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('error')
  })
})

// GET /search/:text
it('400 en JSON cuando el texto tiene menos de 1 caracter', async () => {
    const res = await request(app).get('/search/ab')
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

// POST /albumes
describe('POST /albumes', () => {
  it('201, cabecera Location y slug creado', async () => {
    const res = await request(app)
      .post('/albumes')
      .send({
        titulo:      'Nevermind',
        artista:     'Nirvana',
        genero:      'Grunge',
        anio:        1991,
        sello:       'DGC',
        pistas:      12,
        imagen:      'nevermind.avif',
        resumen:     'El álbum que llevó el grunge al mainstream.',
        descripcion: 'Segundo álbum de Nirvana con Smells Like Teen Spirit.'
      })
    expect(res.status).toBe(201)
    expect(res.headers.location).toBe('/album/nevermind')
    expect(res.body).toHaveProperty('slug')
  })

  it('400 en JSON con cuerpo inválido', async () => {
    const res = await request(app)
      .post('/albumes')
      .send({ titulo: 'Solo el titulo' })
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('409 en JSON cuando el slug ya existe', async () => {
    const res = await request(app)
      .post('/albumes')
      .send({
        titulo:      'Thriller',
        artista:     'Michael Jackson',
        genero:      'Pop',
        anio:        1982,
        sello:       'Epic',
        pistas:      9,
        imagen:      'thriller.avif',
        resumen:     'El álbum más vendido de la historia.',
        descripcion: 'Álbum de Michael Jackson.'
      })
    expect(res.status).toBe(409)
    expect(res.body).toHaveProperty('error')
  })
})

// PUT /album/:slug
describe('PUT /album/:slug', () => {
  it('200 y objeto actualizado cuando existe', async () => {
    const res = await request(app)
      .put('/album/thriller')
      .send({ pistas: 10 })
    expect(res.status).toBe(200)
    expect(res.body.pistas).toBe(10)
  })

  it('404 en JSON cuando el slug no existe', async () => {
    const res = await request(app)
      .put('/album/no-existe')
      .send({ pistas: 10 })
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('error')
  })
})

// DELETE /album/:slug
describe('DELETE /album/:slug', () => {
  it('204 sin cuerpo cuando existe', async () => {
    const res = await request(app).delete('/album/nevermind')
    expect(res.status).toBe(204)
    expect(res.body).toEqual({})
  })

  it('404 en JSON cuando no existe', async () => {
    const res = await request(app).delete('/album/no-existe')
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('error')
  })
})