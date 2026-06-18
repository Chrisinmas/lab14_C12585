import 'dotenv/config'
import app from './app.js'

const HOST = process.env.HOST ?? 'localhost'
const PORT = process.env.PORT ?? 3000

app.listen(PORT, HOST, () => {
  console.log(`🎵 DiscoStore corriendo en http://${HOST}:${PORT}/`)
})