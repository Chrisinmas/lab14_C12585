import { z } from 'zod'
import * as albumes from '../../data/albumes.js'

const searchSchema = z.object({
  text: z.string()
    .trim()
    .min(1, 'La búsqueda no puede estar vacía')
    .max(100, 'La búsqueda es demasiado larga')
})

export const search = (req, res) => {
  const parsed = searchSchema.safeParse(req.params)

  if (!parsed.success) {
    const error = parsed.error.issues[0]?.message ?? 'Búsqueda inválida'
    return res.status(400).json({ error })
  }

  const resultado = albumes.search(parsed.data.text)
  res.json(resultado)
}