import { getCachedExport } from './_cache.js'
import { handleError } from './handleError.js'
import { removeOverlayError } from './removeOverlayError.js'

console.time('dev-tools')
export async function validateHtmlTag(tag) {
    if (!tag) return

    const validHtmlTagSet = await getCachedExport('validHtmlTagSet', 'static')
    if (validHtmlTagSet.has(tag)) return

    const suggestSmartTag = await getCachedExport('suggestSmartTag', 'logic')
    const suggestion = suggestSmartTag(tag)

    handleError(`Invalid HTML tag: <${tag}>`, { suggestion }, { showOverlay: true })
}

export async function validateStyleDSLKeys(referenceProps) {
    const code = 'STYLE_INVALID_DSL_KEY'

    if (!referenceProps) {
        removeOverlayError(code)
        return
    }

    const errorItems = {}
    const specialKeySet = await getCachedExport('specialKeySet', 'static')

    for (const key in referenceProps) {
        if (!specialKeySet.has(key)) {
            errorItems[key] = referenceProps[key]
        }
    }

    const errorKeys = Object.keys(errorItems)
    if (errorKeys.length === 0) {
        removeOverlayError(code)
        return
    }

    handleError('Invalid style object key(s) found in dynamicStyle', errorItems, {
        showOverlay: true,
        code,
    })
}

// export async function validateStyleDSLKeys(referenceProps) {
//     if (!referenceProps) return

//     const errorItems = {}

//     const specialKeySet = await getCachedExport('specialKeySet', 'static')

//     for (const key in referenceProps) {
//         if (!specialKeySet.has(key)) {
//             errorItems[key] = referenceProps[key]
//         }
//     }

//     const errorAry = Object.keys(errorItems)

//     if (errorAry.length === 0) return

//     handleError('Invalid style object key(s) found in dynamicStyle', errorItems, { showOverlay: true })
// }

let displaySetMap

export async function validateCssStringPropsForDisplay(primitiveProps, display) {
    if (!primitiveProps) return

    displaySetMap = await getCachedExport('displaySetMap', 'static')
    const displayPropSet = displaySetMap[display]

    // console.log('primitiveProps:', primitiveProps)
    // console.log('display:', display)

    const invalidProperties = Object.keys(primitiveProps).filter((key) => !displayPropSet.has(key))

    if (invalidProperties.length === 0) return

    const message = `The following properties are invalid for display: '${display}'`
    const data = {
        display,
        invalidProperties,
        code: 'STYLE_INVALID_DISPLAY_PROP',
    }

    handleError(message, data, { showOverlay: true })
}
console.timeEnd('dev-tools')
