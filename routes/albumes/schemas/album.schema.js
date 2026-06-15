import { z } from 'zod'

const AlbumSchema = z.object({
  titulo:      z.string().trim().min(1, 'El título es obligatorio'),
  artista:     z.string().trim().min(1, 'El artista es obligatorio'),
  genero:      z.string().trim().min(1, 'El género es obligatorio'),
  anio:        z.number().int().min(1900, 'Año inválido').max(new Date().getFullYear(), 'Año inválido'),
  sello:       z.string().trim().min(1, 'El sello es obligatorio'),
  pistas:      z.number().int().min(1, 'Debe tener al menos 1 pista'),
  imagen:      z.string().trim().min(1, 'La imagen es obligatoria'),
  resumen:     z.string().trim().min(1, 'El resumen es obligatorio'),
  descripcion: z.string().trim().min(1, 'La descripción es obligatoria')
})

export const AlbumCreateSchema = AlbumSchema
export const AlbumUpdateSchema = AlbumSchema.partial()