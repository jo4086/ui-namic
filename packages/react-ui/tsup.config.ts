import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.js'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    outDir: 'dist',
    target: 'es2018',
    treeshake: true,
    minify: false,
    external: ['@uinamic/debug'],
})
