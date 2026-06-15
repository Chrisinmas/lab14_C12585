import { readFileSync } from 'node:fs'
import { cwd } from 'node:process'
import db from './database.js'

const albumes = JSON.parse(
  readFileSync(`${cwd()}/data/albumes.json`, 'utf-8')
)

const insert = db.prepare(`
  INSERT OR IGNORE INTO albumes
    (slug, titulo, artista, genero, anio, sello, pistas, imagen, resumen, descripcion)
  VALUES
    (@slug, @titulo, @artista, @genero, @anio, @sello, @pistas, @imagen, @resumen, @descripcion)
`)

const insertMany = db.transaction((items) => {
  for (const album of items) insert.run(album)
})

insertMany(albumes)
console.log(`✅ Seed completado: ${albumes.length} álbumes insertados.`)