import { validatePseudoSelectorChain } from './validatePseudoSelector'
import buildBaseModule from './buildBaseModule'
import { forEachObject } from '../shared'
import { pseudoElementSet } from '../constants'

export const buildPseudoModule = (pseudo, META, options = { validate: true }) => {
    const blocks = []

    forEachObject(pseudo, (selector, styles) => {
        if (options.validate) {
            validatePseudoSelectorChain(selector)
        }

        const cssBody = buildBaseModule(styles)

        const isElement = pseudoElementSet.has(selector)
        const prefix = isElement ? '::' : ':'
        const fullSelector = `.${META.baseClassName}${prefix}${selector}`

        blocks.push({
            name: fullSelector,
            css: cssBody,
        })
    })

    return blocks
}
export default buildPseudoModule
