import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['index.js'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    outDir: 'dist',
    target: 'es2018',
    treeshake: true,
    minify: false,
    external: ['@uinamic/debug'],
    esbuildOptions(options) {
        options.jsx = 'transform'
    },
})
