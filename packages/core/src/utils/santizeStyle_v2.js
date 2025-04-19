// @uinamic-system/utils/santizeStyle.js

import normalizeDisplay from './normalizeDisplay'
import { displaySetMap, styleTriggerEventList, styleTriggerOnEventList } from './constants'
import { handleError } from './shared/handleError'
import { validateStyleDSLKeys } from './validateProxy'

function santizeStyle_v2(config) {
    const { display, type, dynamicStyle } = config

    const formatStyleData = transformTransitionRecursive(dynamicStyle)

    const { displayGroup, patchDisplay } = normalizeDisplay(type, display)

    const { primitiveProps, referenceProps } = splitPropsByType(formatStyleData)

    validateCssStringPropsForDisplay(primitiveProps, displayGroup)
    validateStyleDSLKeys(referenceProps)
    // validateDynamicStyleKeys(referenceProps)

    const styleProps = {
        ...primitiveProps,
        ...referenceProps,
    }
    styleProps.display = patchDisplay

    const triggeredEvents = Object.keys(styleProps).filter((k) => styleTriggerEventList.includes(k))

    return { styleProps, triggeredEvents }
}

export default santizeStyle_v2

const optionKeyList = ['keyframes', 'media']
const specialKeySet = new Set([...optionKeyList, ...styleTriggerOnEventList])

const transitionSet = new Set(['transition'])

const normalizeTransitionArray = (input) => {
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

const transformTransitionRecursive = (obj) => {
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

const splitPropsByType = (formatStyleData) => {
    const primitiveProps = {}
    const referenceProps = {}

    for (const [key, value] of Object.entries(formatStyleData)) {
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

const validateDynamicStyleKeys = (referenceProps) => {
    const errorItems = {}

    console.log('referenceProps:', referenceProps)

    for (const key in referenceProps) {
        console.log('key1:', key)
        if (!specialKeySet.has(key)) {
            errorItems[key] = referenceProps[key]
        }
    }

    // for (const key of Object.keys(referenceProps)) {
    //     console.log('key2:', key)

    //     if (!specialKeySet.has(key)) {
    //         errorItems[key] = referenceProps[key]
    //     }
    // }

    if (Object.keys(errorItems).length > 0) {
        handleError('Invalid style object key(s) found in dynamicStyle', errorItems)
    }
}

const validateCssStringPropsForDisplay = (primitiveProps, display) => {
    const displayPropSet = displaySetMap[display]
    const invalidProperties = []

    for (const key of Object.keys(primitiveProps)) {
        if (!displayPropSet.has(key)) {
            invalidProperties.push(key)
        }
    }

    if (invalidProperties.length > 0) {
        handleError(`The following properties are invalid for display: '${display}'`, `Details:\n${invalidProperties.map((p) => ` → ${p}`).join('\n')}`)
    }
}
