import fs from 'fs'
import path from 'path'
import process from 'process'
import { generateColorTokens } from './index.js'
import { defaultColorHSLMap } from './colorMap.js'

const args = process.argv.slice(2)
const outputIndex = args.indexOf('--output')
const outputFile = outputIndex !== -1 ? args[outputIndex + 1] : './theme/color.css'

const outputDir = path.dirname(outputFile)
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
}

// 색상 토큰 생성
const css = generateColorTokens(defaultColorHSLMap)
fs.writeFileSync(outputFile, css, 'utf-8')
console.log(`✅ Generated ${outputFile}`)
