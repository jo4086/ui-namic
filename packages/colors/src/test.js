import { generateColorTokens } from './index.js'

const output = generateColorTokens(
    {
        mint: [160, 100, 50],
        coral: [16, 100, 60],
    },
    {
        path: 'my',
        prefix: 'theme',
        name: 'dkakaks',
        format: 'scss',
    }
)

console.log(output)
