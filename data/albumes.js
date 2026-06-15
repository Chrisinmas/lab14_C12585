import db from './database.js'

export const getAll = () => {
  const query = db.prepare('SELECT slug FROM albumes')
  return query.all()
}

export const getBySlug = (slug) => {
  const query = db.prepare('SELECT * FROM albumes WHERE slug = ?')
  return query.get(slug)
}

export const getByGenero = (genero) => {
  const query = db.prepare('SELECT slug FROM albumes WHERE LOWER(genero) = LOWER(?)')
  return query.all(genero)
}

export const search = (text) => {
  const query = db.prepare('SELECT * FROM albumes WHERE titulo LIKE ? OR artista LIKE ?')
  return query.all(`%${text}%`, `%${text}%`)
}

export const create = (album) => {
  const query = db.prepare(`
    INSERT INTO albumes
      (slug, titulo, artista, genero, anio, sello, pistas, imagen, resumen, descripcion)
    VALUES
      (@slug, @titulo, @artista, @genero, @anio, @sello, @pistas, @imagen, @resumen, @descripcion)
  `)
  return query.run(album)
}

export const update = (slug, data) => {
  const query = db.prepare(`
    UPDATE albumes SET
      titulo      = @titulo,
      artista     = @artista,
      genero      = @genero,
      anio        = @anio,
      sello       = @sello,
      pistas      = @pistas,
      imagen      = @imagen,
      resumen     = @resumen,
      descripcion = @descripcion
    WHERE slug = @slug
  `)
  return query.run({ ...data, slug })
}

export const remove = (slug) => {
  const query = db.prepare('DELETE FROM albumes WHERE slug = ?')
  return query.run(slug)
}