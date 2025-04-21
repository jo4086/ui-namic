import { writeCss, getFullSpectrumFromCenter } from './logic/index.js'
import { defaultColorHSLMap } from './colorMap.js'

export function generateColorTokens(map = defaultColorHSLMap) {
    return writeCss(map, getFullSpectrumFromCenter)
}
