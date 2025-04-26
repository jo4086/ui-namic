import express from 'express'
import { initLoaders } from './loaders'

const app: ExpressServer = express()

export async function App() {
    await initLoaders(app)
}

export default app // ⭐ 서버 인스턴스를 export
