
import { buildCssBlock } from './buildCssBlock'
import { buildPseudoBundle } from './buildPseudoBundle'
import { buildMediaBundle } from './buildMediaBundle'

export default function buildStyleBlocks({ stringBlock = {}, objBlock = {} }) {
    const blocks = []

    // Flat 스타일
    const flatBlock = buildCssBlock(stringBlock)
    blocks.push(` {\n${flatBlock}\n}`)

    // Pseudo
    if (objBlock.pseudo) {
        blocks.push(...buildPseudoBundle(objBlock.pseudo))
    }

    // Media
    if (objBlock.media) {
        blocks.push(...buildMediaBundle(objBlock.media))
    }

    return blocks
}