import * as albumes from '../../data/albumes.js'
import { AlbumCreateSchema } from './schemas/album.schema.js'

const generarSlug = (titulo) =>
  titulo
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

export const create = (req, res) => {
  const parsed = AlbumCreateSchema.safeParse(req.body)

  if (!parsed.success) {
    const error = parsed.error.issues[0]?.message ?? 'Datos inválidos'
    return res.status(400).json({ error })
  }

  const slug = generarSlug(parsed.data.titulo)
  const existente = albumes.getBySlug(slug)

  if (existente)
    return res.status(409).json({ error: 'Ya existe un álbum con ese slug' })

  albumes.create({ slug, ...parsed.data })

  res.status(201).set('Location', `/album/${slug}`).json({ slug })
}