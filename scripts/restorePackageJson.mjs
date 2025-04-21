import fs from 'fs'
import path from 'path'

const pkgDir = path.resolve('./packages/colors')
const backupPath = path.join(pkgDir, '__dev__/package.original.json')
const pkgPath = path.join(pkgDir, 'package.json')

if (fs.existsSync(backupPath)) {
    const raw = fs.readFileSync(backupPath, 'utf-8')
    fs.writeFileSync(pkgPath, raw, 'utf-8')
    console.log('✅ package.json restored from backup.')
} else {
    console.error('❌ No backup found.')
}
