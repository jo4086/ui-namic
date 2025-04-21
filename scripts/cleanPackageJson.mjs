import fs from 'fs'
import path from 'path'

const pkgDir = path.resolve('./packages/colors')
const pkgPath = path.join(pkgDir, 'package.json')

// 원본 백업
const raw = fs.readFileSync(pkgPath, 'utf-8')
const json = JSON.parse(raw)

const devBackupPath = path.join(pkgDir, '__dev__/package.original.json')
fs.mkdirSync(path.dirname(devBackupPath), { recursive: true })
fs.writeFileSync(devBackupPath, raw, 'utf-8')

// 삭제
delete json.scripts
delete json.devDependencies

fs.writeFileSync(pkgPath, JSON.stringify(json, null, 2), 'utf-8')
console.log('🧹 package.json cleaned (dev fields removed) & backup saved.')
