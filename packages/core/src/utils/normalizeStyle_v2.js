import buildBaseModule from './builds/buildBaseModule'
import buildPseudoModule from './builds/buildPseudoModule'
import buildMediaModule from './builds/buildMediaModule'
import buildKeyframesModule from './builds/buildKeyframesModule'
import { insertBaseStyleOnce, insertKeyframesStyleOnce, insertMediaStyleOnce } from './insertDOMStyleOnce'
import { forEachObject } from './shared'
import { dxEventToDomEventMap, pseudoClassSet, pseudoElementSet, styleTriggerEventSet } from './constants'

function normalizeStyle_v2(styleProps, META) {
    const dynamicBlockMap = {}
    const pseudoBlock = {}
    const restBlock = {}

    const { keyfraems, media, rest } = styleProps

    // console.log('rest:', rest)

    // forEachObject(rest, (key, value) => {
    // if (styleTriggerEventSet.has(key)) {
    // const eventKey = dxEventToDomEventMap[key]
    // dynamicBlockMap[eventKey] = value
    // }
    // else if (pseudoClassSet.has(key) || pseudoElementSet.has(key)) {
    // pseudoBlock[key] = value
    // } else {
    // restBlock[key] = value
    // }
    // })

    // const { dynamic, keyframes, media, pseudo, ...rest } = styleProps
    // const { media: DMedia, keyframes: DKeyframes, pseudo: DPseudo, ...DString } = dynamic || {}

    // const baseProps = {
    //     string: rest,
    // }
    // if (media) baseProps.media = media
    // if (pseudo) baseProps.pseudo = pseudo
    // if (keyframes) baseProps.keyframes = keyframes

    // applyStyleModules(baseProps, META, 'base')

    // const dynamicProps = {}
    // if (DString && Object.keys(DString).length) dynamicProps.string = DString
    // if (DMedia) dynamicProps.media = DMedia
    // if (DKeyframes) dynamicProps.keyframes = DKeyframes
    // if (DPseudo) dynamicProps.pseudo = DPseudo

    // if (Object.keys(dynamicProps).length > 0) applyStyleModules(dynamicProps, META, 'dynamic')
}

function applyStyleModules(styleProps, META, mode = 'base') {
    // const className = mode === 'dynamic' ? META.fullClassName : META.baseClassName
    // const selector = mode === 'dynamic' ? META.selectorDynamic : META.selectorBase
    // // keyframes 먼저 분석 (선 삽입 X, block 조립에 사용)
    // let inlineKeyframes = {}
    // if (styleProps.keyframes) {
    //     const keyframesResult = buildKeyframesModule(styleProps.keyframes, META)
    //     inlineKeyframes = keyframesResult.inlineStyle || {}
    //     for (const block of keyframesResult.styleBlocks) {
    //         insertKeyframesStyleOnce(block.name, block.css, { raw: true })
    //     }
    // }
    // // base + keyframe merge
    // if (styleProps.string) {
    //     const merged = {
    //         ...styleProps.string,
    //         ...inlineKeyframes,
    //     }
    //     const cssBlock = buildBaseModule(merged)
    //     if (cssBlock && cssBlock.trim()) {
    //         console.log('cssBlock:', cssBlock)
    //         insertBaseStyleOnce(selector, cssBlock)
    //     }
    // }
    // // pseudo
    // if (styleProps.pseudo) {
    //     const pseudoBlocks = buildPseudoModule(styleProps.pseudo, META)
    //     for (const block of pseudoBlocks) {
    //         insertBaseStyleOnce(block.name, block.css)
    //     }
    // }
    // // media
    // if (styleProps.media) {
    //     const mediaBlocks = buildMediaModule(styleProps.media, META)
    //     console.log('mediaBlocks:', mediaBlocks)
    //     for (const block of mediaBlocks) {
    //         insertMediaStyleOnce(block.name, block.css)
    //     }
    // }
}

export default normalizeStyle_v2
