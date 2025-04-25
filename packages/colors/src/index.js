import fs from 'fs'
import { writeCss, getFullSpectrumFromCenter } from './logic/index.js'
import { defaultColorHSLMap } from './colorMap.js'

export function generateColorTokens(map = defaultColorHSLMap, options = {}) {
    const { format = 'css', name = 'uinamic-color', path: outputPath = './theme', prefix = 'color', limit = 5 } = options

    const resolvedPrefix = format === 'scss' ? `$${prefix}-` : `--${prefix}-`

    const content = writeCss(map, getFullSpectrumFromCenter, {
        format,
        prefix: resolvedPrefix,
        limit,
    })

    const ext = format === 'json' ? 'json' : format === 'scss' ? 'scss' : 'css'
    const filePath = `${outputPath}/${name}.${ext}`

    fs.mkdirSync(outputPath, { recursive: true })
    fs.writeFileSync(filePath, content, 'utf-8')

    return content
}
