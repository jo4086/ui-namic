import { getCachedExport } from './_cache.js'
import { handleError } from './handleError.js'

export async function validateHtmlTag(tag) {
    if (!tag) return

    const validHtmlTagSet = await getCachedExport('validHtmlTagSet', 'static')
    if (validHtmlTagSet.has(tag)) return

    const suggestSmartTag = await getCachedExport('suggestSmartTag', 'logic')
    const suggestion = suggestSmartTag(tag)

    handleError(`Invalid HTML tag: <${tag}>`, { suggestion }, { showOverlay: true })
}

export async function validateStyleDSLKeys(referenceProps) {
    if (!referenceProps) return

    const errorItems = {}

    const specialKeySet = await getCachedExport('specialKeySet', 'static')

    for (const key in referenceProps) {
        if (!specialKeySet.has(key)) {
            errorItems[key] = referenceProps[key]
        }
    }

    const errorAry = Object.keys(errorItems)

    if (errorAry.length === 0) return

    handleError('Invalid style object key(s) found in dynamicStyle', errorItems, { showOverlay: true })
}

export async function validateCssStringPropsForDisplay(primitiveProps, display) {
    if (!primitiveProps) return

    const displaySetMap = await getCachedExport('displaySetMap', 'static')
    const displayPropSet = displaySetMap[display]

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
