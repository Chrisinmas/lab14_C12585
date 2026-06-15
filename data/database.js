import Database from 'better-sqlite3'
import { cwd } from 'node:process'

const db = new Database(`${cwd()}/data/discostore.db`)

db.exec(`
  CREATE TABLE IF NOT EXISTS albumes (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    slug        TEXT    NOT NULL UNIQUE,
    titulo      TEXT    NOT NULL,
    artista     TEXT    NOT NULL,
    genero      TEXT    NOT NULL,
    anio        INTEGER NOT NULL,
    sello       TEXT    NOT NULL,
    pistas      INTEGER NOT NULL,
    imagen      TEXT    NOT NULL,
    resumen     TEXT    NOT NULL,
    descripcion TEXT    NOT NULL
  )
`)

export default db