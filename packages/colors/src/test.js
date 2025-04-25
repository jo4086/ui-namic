import { generateColorTokens } from './index.js'

const output = generateColorTokens(
    {
        mint: [160, 100, 50],
        coral: [16, 100, 60],
        green: [120, 100, 40],
    },
    {
        path: 'my',
        prefix: 'theme',
        name: 'version_3',
        // format: 'scss',
    }
)

console.log(output)
