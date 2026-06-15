import * as albumes from '../../data/albumes.js'

export const remove = (req, res) => {
  const album = albumes.getBySlug(req.params.slug)

  if (!album)
    return res.status(404).json({ error: 'Álbum no encontrado' })

  albumes.remove(req.params.slug)

  res.status(204).send()
}