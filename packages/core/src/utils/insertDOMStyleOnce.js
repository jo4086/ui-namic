import { prefix } from '@debug'

const insertedStyles = {
    base: new Set(),
    media: new Set(),
    keyframes: new Set(),
}

function getOrCreateTag(id) {
    let el = document.getElementById(id)
    if (!el) {
        el = document.createElement('style')
        el.type = 'text/css'
        el.id = id
        document.head.appendChild(el)
    }
    return el
}

export function insertBaseStyleOnce(selector, cssBlock) {
    if (typeof selector !== 'string' || !selector.trim()) {
        throw new Error(`[insertBaseStyleOnce] Invalid selector: ${selector}`)
    }
    if (typeof cssBlock !== 'string' || !cssBlock.trim()) {
        throw new Error(`[insertBaseStyleOnce] Invalid cssBlock: ${cssBlock}`)
    }

    if (insertedStyles.base.has(selector)) return
    const tag = getOrCreateTag(`__${prefix}_style__`)
    tag.appendChild(document.createTextNode(`${selector} {\n${cssBlock}\n}`))
    insertedStyles.base.add(selector)
}

export function insertMediaStyleOnce(query, cssBlock) {
    if (typeof query !== 'string' || !query.trim()) {
        throw new Error(`[insertMediaStyleOnce] Invalid media query: ${query}`)
    }

    if (insertedStyles.media.has(query)) return
    const tag = getOrCreateTag(`__${prefix}_media__`)
    tag.appendChild(document.createTextNode(`@media ${query} {\n${cssBlock}\n}`))
    insertedStyles.media.add(query)
}

export function insertKeyframesStyleOnce(name, css, options = { raw: false }) {
    if (typeof name !== 'string' || !name.trim()) {
        throw new Error(`[insertKeyframesStyleOnce] Invalid keyframes name: ${name}`)
    }
    if (typeof css !== 'string') {
        throw new Error(`[insertKeyframesStyleOnce] css must be string, received ${typeof css}`)
    }

    if (insertedStyles.keyframes.has(name)) return
    const tag = getOrCreateTag(`__${prefix}_keyframes__`)
    tag.appendChild(document.createTextNode(options.raw ? css : `@keyframes ${name} {\n${css}\n}`))
    insertedStyles.keyframes.add(name)
}
