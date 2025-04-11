// @uinamic-system//insertStyleOnce.js
import { prefix } from '@debug'

const STYLE_TAG_ID = `__${prefix}_style__`
let styleTag = null
const insertedClassNames = new Set()

export const insertStyleOnce = (className, cssText) => {
    if (insertedClassNames.has(className)) return
    if (!styleTag) {
        styleTag = document.createElement('style')
        styleTag.type = 'text/css'
        styleTag.id = STYLE_TAG_ID
        document.head.appendChild(styleTag)
    }

    let finalStyle = ''

    if (typeof cssText === 'string') {
        // 기본 방식
        finalStyle = `${className} {\n${cssText}\n}`
    } else if (Array.isArray(cssText)) {
        // 개선 구조 (pseudo, media 등)
        finalStyle = cssText.map((block) => `${className}${block}`).join('\n\n')
    } else {
        throw new Error(`[insertStyleOnce] Invalid cssText type: ${typeof cssText}`)
    }

    styleTag.appendChild(document.createTextNode(finalStyle))
    insertedClassNames.add(className)
}

/* 
    insertedClassSet.add(className)

    let cssText = ''

    if (typeof block === 'string') {
        // 기존 방식
        cssText = `.${className} {\n${block}\n}`
    } else if (Array.isArray(block)) {
        // 개선 구조: 각 블록 앞에 className 붙이기
        cssText = block.map(b => `.${className}${b}`).join('\n\n')
    } else {
        throw new Error(`[insertStyleOnce] Invalid style block type: ${typeof block}`)
    }

    styleEl.textContent += `\n${cssText}\n`
*/
