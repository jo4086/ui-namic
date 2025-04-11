import { camelToKebab } from '../shared'
import { forEachObject } from '../shared'

const INDENT = '    '

export const buildBaseModule = (string) => {
    const blocks = []

    forEachObject(string, (key, value) => {
        const kebabKey = camelToKebab(key)
        const cleanValue = String(value).trim()
        const block = `${INDENT}${kebabKey}: ${cleanValue};` // ✅ 들여쓰기 추가
        blocks.push(block)
    })

    return blocks.join('\n')
}

export default buildBaseModule
