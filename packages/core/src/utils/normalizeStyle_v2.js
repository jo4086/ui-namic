// @uinamic-system/normalizeStyle.js

import { camelToKebab } from './shared'
import { forEachObject, forEachNestedObject } from './shared'
import { insertStyleOnce } from './insertStyleOnce.js'
import { logStyle } from '@debug'
import { pseudoClassSet, pseudoElementSet } from './constants'

const animationPropertyList = ['duration', 'easing', 'delay', 'iteration', 'direction', 'fillMode', 'playState']
const animationPropertySet = new Set(animationPropertyList)
const easingSet = new Set(['easing'])

function normalizeStyle(props, className, prefix) {
    const { dynamic, keyframes, media, pseudo, ...rest } = props
    const dynamicClassName = `${className}.--${prefix}--dynamic`

    logStyle('props', props, 'cyan', '1rem')

    // logStyle('normalizeStyle Input', props, 'yellow', '1rem')

    function safeBuild(source, builderFn) {
        return source ? builderFn(source) : null
    }

    const updateObject = {}
    forEachObject(props, (key, value) => {
        if (typeof value === 'object' && !Array.isArray(value)) {
            const inner = Object.entries(value).sort(([a], [z]) => a.localeCompare(z))

            updateObject[key] = Object.fromEntries(inner)
        } else {
            updateObject[key] = value
        }
    })
    const mergedBlocks = []

    const keyframeBundle = safeBuild(keyframes, buildKeyframesBundle)
    const keyframeStringBlock = keyframeBundle?.inlineStyle
    const keyframeArrayBlock = keyframeBundle?.styleBlocks

    // console.log('keyframeArrayBlock', keyframeArrayBlock)

    const mergedStyle = {
        ...rest,
        ...keyframeStringBlock,
    }
    const flatBlock = buildCssBlock(mergedStyle)
    mergedBlocks.push(` {\n${flatBlock}\n}`)

    // Build
    if (!!pseudo) {
        const pseudoBlocks = safeBuild(pseudo, buildPseudoBundle)
        mergedBlocks.push(...pseudoBlocks)
    }

    insertStyleOnce(`.${className}`, mergedBlocks)
    if (keyframeArrayBlock?.length > 0) {
        for (const block of keyframeArrayBlock) {
            if (block.type === 'keyframes') {
                insertStyleOnce(`@keyframes ${block.name}`, block.css, { raw: true })
            }
        }
    }
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

        insertStyleOnce(`.${dynamicClassName}`, mergedBlocks)
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

    // console.log('blocks', blocks)

    return blocks
}

// const buildPseudoBundle = (pseudo) => {
//     const pseudoClassBlcoks = {}
//     const selectorBlock = {}
//     forEachNestedObject(pseudo, (selector, prop, value) => {
//         if (pseudoClassSet.has(selector)) {
//             pseudoClassBlcoks[selector] = value
//         } else if (pseudoElementSet.has(selector)) {
//         }
//     })

//     // console.log('pseudoClassBlcoks:', pseudoClassBlcoks)
// }

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

    // console.log('blocks', blocks.join('\n'))

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

// function buildKeyframesBundle(keyframes) {
//     /**
//      * buildKeyframesBundle - Generates CSS animation and @keyframes from JS object input.
//      *
//      * 🔹 Main Function
//      *   - keyframesAnalyze
//      *
//      * 🔸 Sub Function
//      *   - exAnimation
//      *   - nonAnimation
//      *   - generateKeyframesCss
//      *
//      * 🔧 Assist Item
//      *   - animationPropertyList
//      *   - animationPropertySet
//      *   - easingSet
//      * ✅ return { animation, css }
//      */

//     // console.log('keyframes:', keyframes)

//     const exAnimation = (name, value) => {
//         const animation = `${name} ${value.animation}`

//         return animation
//     }

//     const nonAnimation = (name, value) => {
//         const animationProperty = {}

//         forEachObject(value, (innerKey, innerValue) => {
//             if (animationPropertySet.has(innerKey)) {
//                 animationProperty[innerKey] = innerValue
//             }
//         })

//         const orderedValues = animationPropertyList.map((key) => animationProperty[key]).filter((value) => value !== undefined)

//         const animation = [name, ...orderedValues].join(' ')

//         return animation
//     }

//     const generateKeyframesCss = (obj) => {
//         const result = {}

//         forEachNestedObject(obj, (animationName, percent, styles) => {
//             const propertyArray = []

//             forEachObject(styles, (propKey, propValue) => {
//                 let brackPoints

//                 if (easingSet.has(propKey)) {
//                     brackPoints = 'animationTimingFunction'
//                 } else {
//                     brackPoints = propKey
//                 }

//                 const kebabKey = camelToKebab(brackPoints)
//                 propertyArray.push(`${kebabKey}: ${propValue};`)
//             })

//             const block = `    ${percent}% {\n        ${propertyArray.join('\n        ')}\n    }`

//             if (!result[animationName]) result[animationName] = []
//             result[animationName].push(block)
//         })

//         const patchResult = Object.entries(result)
//             .map(([name, blocks]) => `@keyframes ${name} {\n${blocks.join('\n')}\n}`)
//             .join('\n\n')

//         return patchResult
//     }

//     function keyframesAnalyze(obj) {
//         const animationArray = []
//         const brackPointsframes = {}

//         // console.log('obj:', obj)

//         forEachObject(obj, (key, value) => {
//             const getAnimation = typeof value.animation === 'string' ? exAnimation(key, value) : nonAnimation(key, value)

//             animationArray.push(getAnimation)

//             brackPointsframes[key] = value.percent
//         })

//         const animation = 'animation: ' + animationArray.join(', ')
//         const css = generateKeyframesCss(brackPointsframes)

//         // console.log('%cAnimation', 'font-weight:bold', '\n' + animation)
//         // console.log('%cCSS', 'font-weight:bold', '\n' + css)

//         return { animation, css }
//     }

//     const result = keyframesAnalyze(keyframes)

//     return result
// }

/* 
  const exAnimation = (name, value) => {
        const animation = `${name} ${value.animation}`

        return animation
    }

    const nonAnimation = (name, value) => {
        const animationProperty = {}

        forEachObject(value, (innerKey, innerValue) => {
            if (animationPropertySet.has(innerKey)) {
                animationProperty[innerKey] = innerValue
            }
        })

        const orderedValues = animationPropertyList.map((key) => animationProperty[key]).filter((value) => value !== undefined)

        const animation = [name, ...orderedValues].join(' ')

        return animation
    }

    const generateKeyframesCss = (obj) => {
        const result = {}

        forEachNestedObject(obj, (animationName, percent, styles) => {
            const propertyArray = []

            forEachObject(styles, (propKey, propValue) => {
                let brackPoints

                if (easingSet.has(propKey)) {
                    brackPoints = 'animationTimingFunction'
                } else {
                    brackPoints = propKey
                }

                const kebabKey = camelToKebab(brackPoints)
                propertyArray.push(`${kebabKey}: ${propValue};`)
            })

            const block = `    ${percent}% {\n        ${propertyArray.join('\n        ')}\n    }`

            if (!result[animationName]) result[animationName] = []
            result[animationName].push(block)
        })

        const patchResult = Object.entries(result)
            .map(([name, blocks]) => `@keyframes ${name} {\n${blocks.join('\n')}\n}`)
            .join('\n\n')

        return patchResult
    }

    function keyframesAnalyze(obj) {
        const animationArray = []
        const brackPointsframes = {}

        // console.log('obj:', obj)

        forEachObject(obj, (key, value) => {
            const getAnimation = typeof value.animation === 'string' ? exAnimation(key, value) : nonAnimation(key, value)

            animationArray.push(getAnimation)

            brackPointsframes[key] = value.percent
        })

        const animation = 'animation: ' + animationArray.join(', ')
        const css = generateKeyframesCss(brackPointsframes)

        // console.log('%cAnimation', 'font-weight:bold', '\n' + animation)
        // console.log('%cCSS', 'font-weight:bold', '\n' + css)

        return { animation, css }
    }

    const { animation, css } = keyframesAnalyze(keyframes)

    return { animation, css }

*/

const specialKeySet = new Set(['pseudo', 'media', 'keyframes'])

const specialKeySplit = (props) => {
    const result = { pseudoProps: {}, mediaProps: {}, keyframesProps: {} }
    const map = {
        pseudo: result.pseudoProps,
        media: result.mediaProps,
        keyframes: result.keyframesProps,
    }

    // console.log('map:', map)

    for (const [key, value] of Object.entries(props)) {
        if (specialKeySet.has(key)) {
            map[key][key] = value
        }
    }

    const filteredResult = Object.fromEntries(Object.entries(result).filter(([_, value]) => Object.keys(value).length > 0))

    return filteredResult
}

const objectToCss = (obj) => {
    const result = Object.entries(obj).map(([key, value]) => {
        const cssKey = camelToKebab(key)
        return `${cssKey}: ${value};`
    })

    return result.join(`\n`)
}
