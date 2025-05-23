import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.js'],
    format: ['esm', 'cjs'],
    dts: false,
    clean: true,
    outDir: 'dist',
    target: 'es2018',
    treeshake: true,
    minify: false,
    outExtension({ format }) {
        return {
            js: format === 'esm' ? '.mjs' : '.js',
        }
    },
    external: ['react', 'react-dom'],
})
