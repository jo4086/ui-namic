import 'dotenv/config'
import app, { App } from './app'

const PORT = process.env.PORT || 3000

async function bootstrap() {
    try {
        await App()
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`)
        })
    } catch (err) {
        console.error('Failed to initialize app:', err)
        process.exit(1)
    }
}
