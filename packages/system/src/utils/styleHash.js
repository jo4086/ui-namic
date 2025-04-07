// @uinamic-system/utils/styleHash.js

import insertStyleOnce from './insertStyleOnce'

function generateClassName(key) {
    return 'dynamic-' + btoa(key).slice(0, 6)
}

function camelToKebab(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

function styleToCssText(selector, styleObj) {
    const props = Object.entries(styleObj)
        .map(([key, value]) => `${camelToKebab(key)}: ${value};`)
        .join('\n')

    return `${selector} {\n${props}\n}`
}

const styleCache = new Map()

export function getOrCreateStyle(styleObj) {
    const key = JSON.stringify(styleObj)
    if (styleCache.has(key)) return styleCache.get(key)

    const className = generateClassName(key)
    const cssText = styleToCssText(`.${className}`, styleObj)
    insertStyleOnce(className, cssText)

    const result = { className, cssText }
    styleCache.set(key, result)
    return result
}
