import fs from 'fs'
import { writeCss, getFullSpectrumFromCenter } from './logic/index.js'
import { defaultColorHSLMap } from './colorMap.js'

export function generateColorTokens(map = defaultColorHSLMap, options = {}) {
    const {
        format = 'css',
        name = 'uinamic-color',
        path: outputPath = './theme',
        prefix = 'color', // 기본 'color'로 설정
    } = options

    // format에 따라 prefix 변경
    const resolvedPrefix = format === 'scss' ? `$${prefix}-` : `--${prefix}-`

    const content = writeCss(map, getFullSpectrumFromCenter, {
        format,
        prefix: resolvedPrefix,
    })

    const ext = format === 'json' ? 'json' : format === 'scss' ? 'scss' : 'css'
    const filePath = `${outputPath}/${name}.${ext}`

    fs.mkdirSync(outputPath, { recursive: true })
    fs.writeFileSync(filePath, content, 'utf-8')

    return content // 파일 저장하면서 문자열도 그대로 반환
}
