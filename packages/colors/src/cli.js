import { generateColorTokens } from './index.js'
import fs from 'fs'
import path from 'path'

// 커맨드라인 인자 처리
const args = process.argv.slice(2)

// --output은 폴더만 받아옴
const outputIndex = args.indexOf('--path')
const outputDir = outputIndex !== -1 ? args[outputIndex + 1] : './theme' // 기본 경로는 './theme'

// --name은 파일명으로 사용
const nameIndex = args.indexOf('--name')
const name = nameIndex !== -1 ? args[nameIndex + 1] : 'uinamic-color' // 기본 파일명 'uinamic-color'

// --format 인자 처리
const formatIndex = args.indexOf('--format')
const format = formatIndex !== -1 ? args[formatIndex + 1] : 'css' // 기본값은 'css'

// --prefix 인자 처리
const prefixIndex = args.indexOf('--prefix')
let prefix

if (format === 'scss') {
    const set = prefixIndex !== -1 ? args[prefixIndex + 1] : 'color' // 기본값 'color'
    prefix = set ? `${set}` : 'color' // SCSS 포맷일 때는 $theme- 형태
} else {
    const set = prefixIndex !== -1 ? args[prefixIndex + 1] : 'color'
    prefix = set ? `${set}` : 'colo-'
}

// 경로가 없으면 생성
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
}

// 파일 경로 결정
const filePath = path.join(outputDir, `${fileName}.${format === 'json' ? 'json' : format === 'scss' ? 'scss' : 'css'}`)

// 색상 토큰 생성
const css = generateColorTokens(
    {
        mint: [160, 100, 50],
        coral: [16, 100, 60],
    },
    { format, prefix, name, path: outputDir } // 동적으로 받아온 값 전달
)

// 파일 저장
fs.writeFileSync(filePath, css, 'utf-8')
console.log(`✅ Generated ${filePath}`)
