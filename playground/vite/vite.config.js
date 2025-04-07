import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@uinamic/system': path.resolve(__dirname, '../../packages/system/dist/index.js'),
            '@uinamic/react': path.resolve(__dirname, '../../packages/react/dist/index.js'),
            '@uinamic/react-ui': path.resolve(__dirname, '../../packages/react-ui/dist/index.js'),
            '@uinamic/debug': path.resolve(__dirname, '../../packages/debug/src/index.js'),
        },
    },
    build: {
        rollupOptions: {
            external: ['react', 'react-dom'],
        },
    },
})
