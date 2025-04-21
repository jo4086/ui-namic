import { defineConfig } from 'tsup'

export default defineConfig([
    {
        entry: ['src/index.js'],
        format: ['esm', 'cjs'],
        target: 'node16',
        dts: { entry: './src/index.js' },
        clean: true,
    },
    {
        entry: ['src/cli.js'],
        format: ['cjs'], // ✅ CLI는 CJS로 빌드
        target: 'node16',
        splitting: false,
        clean: false,
        banner: {
            js: '#!/usr/bin/env node',
        },
    },
])
