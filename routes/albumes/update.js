import * as albumes from '../../data/albumes.js'
import { AlbumUpdateSchema } from './schemas/album.schema.js'

export const update = (req, res) => {
  const album = albumes.getBySlug(req.params.slug)

  if (!album)
    return res.status(404).json({ error: 'Álbum no encontrado' })

  const parsed = AlbumUpdateSchema.safeParse(req.body)

  if (!parsed.success) {
    const error = parsed.error.issues[0]?.message ?? 'Datos inválidos'
    return res.status(400).json({ error })
  }

  const campos = { ...album, ...parsed.data }
  delete campos.id

  albumes.update(req.params.slug, campos)

  res.json(albumes.getBySlug(req.params.slug))
}