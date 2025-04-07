import { defineConfig } from 'tsup'
import pkg from './package.json'

export default defineConfig({
    entry: ['src/index.js'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    outDir: 'dist',
    target: 'es2018',
    treeshake: true,
    minify: false,
    external: [...Object.keys(pkg.peerDependencies || {}), '@uinamic/debug'],
    esbuildOptions(options) {
        options.jsx = 'automatic'
    },
})
