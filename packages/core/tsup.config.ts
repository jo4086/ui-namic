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
    external: [],
    env: {
        NODE_ENV: 'production', // 👈 tsup 빌드시 환경변수 지정 가능
    },
})
