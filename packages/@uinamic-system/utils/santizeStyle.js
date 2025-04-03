// @uinamic-system/utils/santizeStyle.js

import normalizeDisplay from './normalizeDisplay'
import { onEventAllSet, displaySetMap } from './constants'
import { forEachObject } from './shared'

function santizeStyle(config) {
    const { display, type, dynamicStyle: styleProps, props: spreadProps, dynamicType } = config

    const mergeProps = { ...spreadProps, ...styleProps }

    const formatData = transformTransitionRecursive(mergeProps)

    const { displayGroup, patchDisplay } = normalizeDisplay(type, display)

    const { primitiveProps, referenceProps } = dataType(formatData)
    // console.log('primitiveProps:', primitiveProps)
    // console.log('referenceProps:', referenceProps)

    const { cssStringProps, normalStringProps } = cssProps(primitiveProps, displayGroup)

    // console.log('cssStringProps:', cssStringProps)
    // console.log('normalStringProps:', normalStringProps)

    const { cssObjProps, onEventProps, normalObjProps } = propsGroup(referenceProps)

    const filteredProps = {
        styleProps: {
            ...cssStringProps,
            ...cssObjProps,
        },
        onEventProps,
        normalProps: {
            ...normalStringProps,
            ...normalObjProps,
        },
    }

    const onEvent = mergeProps[dynamicType] || null

    const response = formatting(filteredProps, dynamicType, onEvent, patchDisplay)

    return response
}

export default santizeStyle

const keySet = new Set(['dynamic', 'keyframes', 'media', 'pseudo'])
const transitionSet = new Set(['transition'])
const classNameSet = new Set(['className'])

function normalizeTransitionArray(input) {
    if (typeof input === 'string') return input
    if (!Array.isArray(input)) return ''

    const results = []

    for (const item of input) {
        if (typeof item === 'string') {
            results.push(item)
        } else if (typeof item === 'object' && item.name && item.value) {
            const props = item.name.split(',').map((p) => p.trim())
            for (const prop of props) {
                results.push(`${prop} ${item.value}`)
            }
        }
    }

    return results.join(', ')
}

function transformTransitionRecursive(obj) {
    if (typeof obj !== 'object' || obj === null) return obj

    const result = Array.isArray(obj) ? [...obj] : { ...obj }

    for (const key in result) {
        const value = result[key]

        if (transitionSet.has(key) && Array.isArray(value)) {
            result[key] = normalizeTransitionArray(value)
        } else if (typeof value === 'object') {
            result[key] = transformTransitionRecursive(value)
        }
    }

    return result
}

// const transitionType = (props) => {
//     const traverse = (current) => {
//         if (Array.isArray(current)) return current // 배열은 그대로 반환!

//         const copy = { ...current }
//         for (const [key, value] of Object.entries(copy)) {
//             if (transitionSet.has(key) && Array.isArray(value)) {
//                 // 특수 처리
//             } else if (typeof value === 'object' && value !== null) {
//                 copy[key] = traverse(value)
//             }
//         }
//         return copy
//     }

//     const mergeForm = traverse(props)
//     return mergeForm
// }

// const normalizeTransition = (input) => {
//     if (typeof input === 'string') return input
//     if (!Array.isArray(input)) return ''

//     const results = []

//     for (const item of input) {
//         if (typeof item === 'string') {
//             results.push(item)
//         } else if (typeof item === 'object' && item.name && item.value) {
//             const props = item.name.split(',').map((p) => p.trim())
//             for (const prop of props) {
//                 results.push(`${prop} ${item.value}`)
//             }
//         }
//     }

//     return results.join(', ')
// }

const dataType = (formatData) => {
    const primitiveProps = {}
    const referenceProps = {}

    for (const [key, value] of Object.entries(formatData)) {
        const isPrimitive = value === null || typeof value !== 'object' // ✅ number, string, boolean 다 포함
        const isTransition = transitionSet.has(key)

        if (isPrimitive || isTransition) {
            primitiveProps[key] = value
        } else {
            referenceProps[key] = value
        }
    }

    return { primitiveProps, referenceProps }
}

/* const dataType = (formatData) => {
    const primitiveProps = {}
    const referenceProps = {}

    for (const [key, value] of Object.entries(formatData)) {
        if (typeof value === 'string' || transitionSet.has(key) === true) {
            primitiveProps[key] = value
        } else {
            referenceProps[key] = value
        }
    }

    return { primitiveProps, referenceProps }
}
 */

const propsGroup = (referenceProps) => {
    const cssObjProps = {}
    const onEventProps = {}
    const normalObjProps = {}

    console.time('has')
    for (const [key, value] of Object.entries(referenceProps)) {
        if (keySet.has(key)) {
            cssObjProps[key] = value
        } else if (onEventAllSet.has(key)) {
            onEventProps[key] = value
        } else {
            normalObjProps[key] = value
        }
    }

    console.timeEnd('has')

    return {
        cssObjProps,
        onEventProps,
        normalObjProps,
    }
}

const cssProps = (primitiveProps, display) => {
    const cssStringProps = {}
    const normalStringProps = {}
    // console.log('displayGroup:', display)
    const displayPropSet = displaySetMap[display]
    // console.log('displayPropSet:', displayPropSet)

    for (const [key, value] of Object.entries(primitiveProps)) {
        if (displayPropSet.has(key)) {
            cssStringProps[key] = value
        } else {
            normalStringProps[key] = value
        }
    }

    return { cssStringProps, normalStringProps }
}

const formatting = (filteredProps, dynamicType, onEvent, patchDisplay) => {
    const { normalProps: normal, styleProps: style, onEventProps: event } = filteredProps || {}

    const { className, ...restNormal } = normal || {}
    const filteredNormal = Object.fromEntries(Object.entries(restNormal).filter(([key]) => !classNameSet.has(key)))

    const format = {
        style,
        className,
        patchDisplay,
        other: {
            ...filteredNormal,
            ...event,
        },
        dynamicTrigger: {
            dynamicType,
            onEvent,
        },
    }

    return format
}
