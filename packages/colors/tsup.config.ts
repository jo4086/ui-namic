import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.js'],
    format: ['esm', 'cjs'],
    target: 'node16',
    splitting: false,
    clean: true,
    dts: {
        entry: './src/index.js',
    },
})
