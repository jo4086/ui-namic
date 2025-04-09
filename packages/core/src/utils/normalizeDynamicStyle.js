import buildStyleBlocks from './builds/buildStyleBlocks'
import { buildDynamicBundle } from './builds/buildDynamicBundle'
import { buildKeyframesBundle } from './builds/buildKeyframesBundle'
import { insertStyleOnce } from './shared/insertStyleOnce'
import { insertKeyframesOnce } from './shared/insertKeyframesOnce'

export function normalizeDynamicStyle(dynamic, className) {
    const { stringBlock, objBlock } = buildDynamicBundle(dynamic)
    const selector = `.${className}.--UINAMIC--dynamic`

    // animation 제거
    if (stringBlock?.animation) {
        delete stringBlock.animation
    }

    const dynamicBlocks = buildStyleBlocks({ stringBlock, objBlock })
    insertStyleOnce(selector, dynamicBlocks)

    if (objBlock?.keyframes) {
        const keyframeBundle = buildKeyframesBundle(objBlock.keyframes)
        insertKeyframesOnce(keyframeBundle?.styleBlocks)
    }
}
