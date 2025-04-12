// @uinamic-system/normalizeStyle.js

import { camelToKebab } from './shared'
import { forEachObject, forEachNestedObject } from './shared'
import { insertStyleOnce } from './insertStyleOnce.js'
import { logStyle } from '@debug'
import { pseudoClassSet, pseudoElementSet } from './constants'
import buildKeyframesModule from './builds/buildKeyframesModule'
import buildMediaModule from './builds/buildMediaModule'
import buildPseudoModule from './builds/buildPseudoModule'
import { insertBaseStyleOnce } from './insertDOMStyleOnce'

const animationPropertyList = ['duration', 'easing', 'delay', 'iteration', 'direction', 'fillMode', 'playState']
const animationPropertySet = new Set(animationPropertyList)
const easingSet = new Set(['easing'])

function normalizeStyle(props, META) {
    const { dynamic, keyframes, media, pseudo, ...rest } = props

    // const { media: DMedia, keyframes: DKeyframes, pseudo: DPseudo, ...DString } = dynamic || {}

    // const dynamicProps = {}
    // if (DString && Object.keys(DString).length) dynamicProps.string = DString
    // if (DMedia) dynamicProps.media = DMedia
    // if (DKeyframes) dynamicProps.keyframes = DKeyframes
    // if (DPseudo) dynamicProps.pseudo = DPseudo

    // if (Object.keys(dynamicProps).length > 0) normalizeDynamicStyle(dynamicProps, META)

    // const DMedia = dynamic?.media
    // const DKeyframes = dynamic?.keyframes
    // const DPseudo = dynamic?.pseudo

    // console.log('DMedia', DMedia, 'DKeyframes', DKeyframes, 'DPseudo', DPseudo)

    const baseProps = {
        string: rest,
    }
    if (media) baseProps.media = media
    if (pseudo) baseProps.pseudo = pseudo
    if (keyframes) baseProps.keyframes = keyframes

    // normalizeBaseStyle(baseProps, META)
    // normalizeDynamicStyle(dynamic, META)

    function safeBuild(source, builderFn) {
        return source ? builderFn(source) : null
    }

    function safeBuild2(source, META, builderFn) {
        return source ? builderFn(source, META) : null
    }

    const keyframesModule = safeBuild2(keyframes, META, buildKeyframesModule)
    // console.log('keyframesMoluled:', keyframesModule)
    const mediaModule = safeBuild2(media, META, buildMediaModule)
    // console.log('mediaModule:', mediaModule)
    const pseudoModule = safeBuild2(pseudo, META, buildPseudoModule)
    // console.log('pseudoModule:', pseudoModule)
    // insertBaseStyleOnce(pseudoModule.name, pseudoModule.css)

    if (!!pseudoModule) {
        for (const block of pseudoModule) {
            insertBaseStyleOnce(block.name, block.css)
        }
    }

    const mergedBlocks = []

    // const keyframeBundle = safeBuild(keyframes, buildKeyframesBundle)
    // const keyframeStringBlock = keyframeBundle?.inlineStyle
    // const keyframeArrayBlock = keyframeBundle?.styleBlocks

    const mergedStyle = {
        ...rest,
        // ...keyframeStringBlock,
    }
    const flatBlock = buildCssBlock(mergedStyle)
    mergedBlocks.push(` {\n${flatBlock}\n}`)

    // Build
    // if (!!pseudo) {
    //     const pseudoBlocks = safeBuild(pseudo, buildPseudoBundle)
    //     mergedBlocks.push(...pseudoBlocks)
    // }

    // insertStyleOnce(META.selectorBase, mergedBlocks)
    // if (keyframeArrayBlock?.length > 0) {
    //     for (const block of keyframeArrayBlock) {
    //         if (block.type === 'keyframes') {
    //             insertStyleOnce(`@keyframes ${block.name}`, block.css, { raw: true })
    //         }
    //     }
    // }
    if (!!dynamic) {
        const dynamicBundle = safeBuild(dynamic, buildDynamicBundle)
        const stringBlock = dynamicBundle?.stringBlock
        const objBlock = dynamicBundle?.objBlock

        const mergedBlocks = []
        const mergedStyle = {
            ...stringBlock,
        }
        const flatBlock = buildCssBlock(mergedStyle)
        // console.log('mergedStyle:', mergedStyle)
        mergedBlocks.push(` {\n${flatBlock}\n}`)

        // insertStyleOnce(META.selectorDynamic, mergedBlocks)
    }
}

export default normalizeStyle

const optionList = ['vertical', 'horizontal', 'hover']
const optionMap = {
    vertical: 'orientation: portrait',
    horizontal: 'orientation: landscape',
}

const buildDynamicBundle = (dynamic) => {
    const stringBlock = {}
    const objBlock = {}

    for (const [key, value] of Object.entries(dynamic)) {
        if (typeof value === 'string') {
            stringBlock[key] = value
        } else {
            objBlock[key] = value
        }
    }

    // console.log('dynamic stringBlock:', stringBlock)
    return { stringBlock, objBlock }
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

    return blocks
}

// 3차버전
function buildMediaBundle(media) {
    const positionMap = {
        up: 'min-width',
        down: 'max-width',
    }

    const result = []

    const ensurePx = (value) => (typeof value === 'number' ? `${value}px` : value)

    const processBlock = (type, list) => {
        return list.map((item) => {
            let conditions = []
            let style = { ...item }

            if (type === 'between') {
                const { up, down, ...rest } = item
                if (up) conditions.push(`(min-width: ${ensurePx(up)})`)
                if (down) conditions.push(`(max-width: ${ensurePx(down)})`)
                style = rest
            } else {
                const { point, ...rest } = item
                const condition = `(${positionMap[type]}: ${ensurePx(point)})`
                conditions.push(condition)
                style = rest
            }

            return { condition: conditions, style }
        })
    }

    forEachObject(media, (key, value) => {
        if (key === 'between' || key === 'up' || key === 'down') {
            const blocks = processBlock(key, value)
            result.push(...blocks)
        }

        if (key === 'advanced') {
            const advancedBlocks = value.map(({ query, ...style }) => ({
                condition: [query],
                style,
            }))
            result.push(...advancedBlocks)
        }
    })

    // console.log(result)

    return result
}

const INDENT = '    '

function buildCssBlock(string) {
    const blocks = []

    forEachObject(string, (key, value) => {
        const kebabKey = camelToKebab(key)
        const cleanValue = String(value).trim()
        const block = `${INDENT}${kebabKey}: ${cleanValue};` // ✅ 들여쓰기 추가
        blocks.push(block)
    })

    return blocks.join('\n')
}

function buildKeyframesBundle(keyframes) {
    const exAnimation = (name, value) => `${name} ${value.animation}`

    const nonAnimation = (name, value) => {
        const animationProperty = {}
        forEachObject(value, (k, v) => {
            if (animationPropertySet.has(k)) animationProperty[k] = v
        })

        const ordered = animationPropertyList.map((k) => animationProperty[k]).filter(Boolean)
        return [name, ...ordered].join(' ')
    }

    const generateKeyframesCss = (framesObj) => {
        const result = {}

        forEachNestedObject(framesObj, (name, percent, styles) => {
            const block = `    ${percent}% {\n        ${Object.entries(styles)
                .map(([k, v]) => `${camelToKebab(k)}: ${v};`)
                .join('\n        ')}\n    }`
            if (!result[name]) result[name] = []
            result[name].push(block)
        })

        return Object.entries(result).map(([name, blocks]) => ({
            type: 'keyframes',
            name,
            css: `${blocks.join('\n')}`,
        }))
    }

    const keyframesAnalyze = (obj) => {
        const animations = []
        const frames = {}

        forEachObject(obj, (key, val) => {
            const anim = typeof val.animation === 'string' ? exAnimation(key, val) : nonAnimation(key, val)

            animations.push(anim)
            frames[key] = val.percent
        })

        return {
            inlineStyle: { animation: animations.join(', ') },
            styleBlocks: generateKeyframesCss(frames),
        }
    }
    // console.log('keyframesAnalyze(keyframes):', keyframesAnalyze(keyframes))
    return keyframesAnalyze(keyframes)
}
