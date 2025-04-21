import { defaultColorHSLMap } from './colorMap.js'
import { generateColorTokens } from './index.js'
import fs from 'fs'
import path from 'path'

const args = process.argv.slice(2)

const outputIndex = args.indexOf('--path')
const outputDir = outputIndex !== -1 ? args[outputIndex + 1] : './theme'

const nameIndex = args.indexOf('--name')
const name = nameIndex !== -1 ? args[nameIndex + 1] : 'uinamic-color'

const formatIndex = args.indexOf('--format')
const format = formatIndex !== -1 ? args[formatIndex + 1] : 'css'

const prefixIndex = args.indexOf('--prefix')
let prefix

if (format === 'scss') {
    const set = prefixIndex !== -1 ? args[prefixIndex + 1] : 'color'
    prefix = set ? `${set}` : 'color'
} else {
    const set = prefixIndex !== -1 ? args[prefixIndex + 1] : 'color'
    prefix = set ? `${set}` : 'colo-'
}

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
}

const filePath = path.join(outputDir, `${name}.${format === 'json' ? 'json' : format === 'scss' ? 'scss' : 'css'}`)

const css = generateColorTokens(defaultColorHSLMap, { format, prefix, name, path: outputDir })

fs.writeFileSync(filePath, css, 'utf-8')
console.log(`✅ Generated ${filePath}`)
