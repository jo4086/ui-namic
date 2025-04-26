import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@react-ui': path.resolve(__dirname, '../../packages/react-ui/src/index.js'),
            '@debug': path.resolve(__dirname, '../../packages/debug/src/index.js'),
            '@core': path.resolve(__dirname, '../../packages/core/src/index.js'),
            '@uinamic/dev-tools': path.resolve(__dirname, '../../packages/dev-tools/src/index.js'),
        },
    },
    server: {
        watch: {
            // overlay: false,
            // ignored: ['./src/*'],
        },
    },
})
