import { pseudoClassSet, pseudoElementSet } from '../constants'

const animationPropertyList = ['duration', 'easing', 'delay', 'iteration', 'direction', 'fillMode', 'playState']
const animationPropertySet = new Set(animationPropertyList)
const easingSet = new Set(['easing'])

const INDENT = '    '
const buildCssBlock = (string) => {
    const blocks = []

    forEachObject(string, (key, value) => {
        const kebabKey = camelToKebab(key)
        const cleanValue = String(value).trim()
        const block = `${INDENT}${kebabKey}: ${cleanValue};` // ✅ 들여쓰기 추가
        blocks.push(block)
    })

    // console.log('blocks', blocks.join('\n'))

    return blocks.join('\n')
}

const buildPseudoBundle = (pseudo) => {
    const blocks = []

    forEachObject(pseudo, (selector, styles) => {
        if (pseudoClassSet.has(selector)) {
            const cssBody = buildCssBlock(styles)
            blocks.push(`:${selector} {\n${cssBody}\n}`)
        } else if (pseudoElementSet.has(selector)) {
            const cssBody = buildCssBlock(styles)
            blocks.push(`::${selector} {\n${cssBody}\n}`)
        }
    })

    console.log('blocks', blocks)

    return blocks
}
