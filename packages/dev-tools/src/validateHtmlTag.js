import { getCachedExport } from './_cache.js'
import { handleError } from './handleError.js'

export async function validateHtmlTag(tag) {
    if (!tag) return

    const validHtmlTagSet = await getCachedExport('./constants.js', 'validHtmlTagSet', 'static')
    if (validHtmlTagSet.has(tag)) return

    const suggestSmartTag = await getCachedExport('./suggestSmartTag.js', 'suggestSmartTag', 'logic')
    const suggestion = suggestSmartTag(tag)

    handleError(`Invalid HTML tag: <${tag}>`, { suggestion }, { showOverlay: true })
}
