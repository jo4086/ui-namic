// @uinamic-system/normalizeStyle.js

import { camelToKebab } from './shared'
import { forEachObject, forEachNestedObject } from './shared'
import { getOrCreateStyle } from './styleHash.js'
import insertStyleOnce from './insertStyleOnce.js'

const animationPropertyList = ['duration', 'easing', 'delay', 'iteration', 'direction', 'fillMode', 'playState']
const animationPropertySet = new Set(animationPropertyList)
const easingSet = new Set(['easing'])

function normalizeStyle(props) {
    const { dynamic, keyframes, media, pseudo, ...rest } = props
    // console.log(props)

    const classKey = JSON.stringify({ rest, dynamic, media, keyframes, pseudo })
    const sortClassKey = stableStringify(props)

    const stableEntries = Object.entries(props).sort(([a], [z]) => a.localeCompare(z))
    // console.log('stableEntires:', stableEntries)

    const testing = Object.fromEntries(Object.entries(props).sort(([a], [z]) => a.localeCompare(z)))

    const classKeys = JSON.stringify(testing)
    // console.log('!!! classKeys:', classKeys)

    const updateObject = {}
    forEachObject(props, (key, value) => {
        if (typeof value === 'object' && !Array.isArray(value)) {
            const inner = Object.entries(value).sort(([a], [z]) => a.localeCompare(z))

            updateObject[key] = Object.fromEntries(inner)
        } else {
            updateObject[key] = value
        }
    })

    // console.log('aa:', JSON.stringify(Object.fromEntries(Object.entries(updateObject).sort(([a], [z]) => a.localeCompare(z)))))

    // const stableProps = Object.entries(props)

    // console.log(stableProps)
    // console.log(stableProps.sort())

    // console.log('stableProps:', stableProps[0][0])

    // console.log('sortClassKey:', sortClassKey)

    // console.log('classKey:', classKey)

    // console.log('rest:', rest)

    console.time('deep')
    const sortedProps = deepSortObject(props)
    console.log(JSON.stringify(sortedProps))
    console.timeEnd('deep')

    const generatedClassName = generateClassName(props)

    // console.log('generatedClassName:', generatedClassName)

    const { animation, css } = buildKeyframesBundle(keyframes)
    const cssBlock = buildCssBlock(rest)

    buildMediaBundle(media)

    console.log('cssBlock\n' + cssBlock)
    // console.log('animation:', animation)
    // console.log('css:', css)

    const fullCssText = `${cssBlock}\n\n.${generateClassName} {\n    ${animation}}`

    insertStyleOnce(generateClassName, fullCssText)
}

function deepSortObject(obj) {
    if (Array.isArray(obj)) {
        // 배열은 정렬 대상 아님, 내부 값만 재귀 처리
        return obj.map((item) => (typeof item === 'object' && item !== null ? deepSortObject(item) : item))
    }

    if (typeof obj === 'object' && obj !== null) {
        const sortedEntries = Object.entries(obj)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => [key, deepSortObject(value)]) // 재귀 호출

        return Object.fromEntries(sortedEntries)
    }

    // 원시값이면 그대로 반환
    return obj
}

function stableStringify(obj) {
    return JSON.stringify(obj, Object.keys(obj).sort())
}

export default normalizeStyle

const optionList = ['vertical', 'horizontal', 'hover']
const optionMap = {
    vertical: 'orientation: portrait',
    horizontal: 'orientation: landscape',
}

function generateClassName(key) {
    return 'dynamic-' + btoa(key).slice(0, 6)
}

// 3차버전
function buildMediaBundle(media) {
    if (!media) return []

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

    console.log(result)

    return result
}

function buildCssBlock(string) {
    const blocks = []

    forEachObject(string, (key, value) => {
        const kebabKey = camelToKebab(key)

        const block = `${kebabKey} : ${value};`
        blocks.push(block)
    })

    const result = blocks.join('\n')

    return result
}

function buildKeyframesBundle(keyframes) {
    /**
     * buildKeyframesBundle - Generates CSS animation and @keyframes from JS object input.
     *
     * 🔹 Main Function
     *   - keyframesAnalyze
     *
     * 🔸 Sub Function
     *   - exAnimation
     *   - nonAnimation
     *   - generateKeyframesCss
     *
     * 🔧 Assist Item
     *   - animationPropertyList
     *   - animationPropertySet
     *   - easingSet
     */

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
}

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

const typeChecker = (data, { type = null }) => {
    switch (type) {
        case 'object':
            return typeof data === 'object' && data !== null && !Array.isArray(data)
        case 'array':
            return Array.isArray(data)
        case 'string':
            return typeof data === 'string'
        default:
            return false
    }
}

const objectToCss = (obj) => {
    const result = Object.entries(obj).map(([key, value]) => {
        const cssKey = camelToKebab(key)
        return `${cssKey}: ${value};`
    })

    return result.join(`\n`)
}

const dynamicKey = (obj) => {
    const { primitiveProps, referenceProps } = dataType(obj)

    const { pseudoProps = null, mediaProps = null, keyframesProps = null } = specialKeySplit(referenceProps)

    const string = objectToCss(primitiveProps)
}

const dataType = (formatData) => {
    const primitiveProps = {}
    const referenceProps = {}

    for (const [key, value] of Object.entries(formatData)) {
        if (typeof value === 'string') {
            primitiveProps[key] = value
        } else {
            referenceProps[key] = value
        }
    }

    return { primitiveProps, referenceProps }
}

const pseudoType = (obj) => {
    console.log('obj:', obj)
}
