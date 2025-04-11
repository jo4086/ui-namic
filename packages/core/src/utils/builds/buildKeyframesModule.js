import { camelToKebab } from '../shared'
import { forEachNestedObject, forEachObject } from '../shared'
import buildBaseModule from './buildBaseModule'

// 고정된 animation 속성 리스트
const animationPropertyList = ['duration', 'animationDuration', 'easing', 'timingFunction', 'animationTimingFunction', 'delay', 'animationDelay', 'iteration', 'animationIterationCount', 'direction', 'animationDirection', 'fillMode', 'animationFillMode', 'playState', 'animationPlayState']
const animationPropertySet = new Set(animationPropertyList)

// JS key → CSS 속성으로 매핑
const animationPropertyMap = {
    duration: 'animation-duration',
    easing: 'animation-timing-function',
    timingFunction: 'animation-timing-function',
    delay: 'animation-delay',
    iteration: 'animation-iteration-count',
    animationIterationCount: 'animation-iteration-count',
    direction: 'animation-direction',
    fillMode: 'animation-fill-mode',
    playState: 'animation-play-state',
}

export const buildKeyframesModule = (keyframes, META) => {
    const animations = []
    const frames = {}

    forEachObject(keyframes, (key, value) => {
        const keyframeName = `${META.baseClassName}_${key}`

        const result = typeof value.animation === 'string' ? { string: exAnimation(keyframeName, value), inline: '' } : nonAnimation(keyframeName, value)

        animations.push(result.string)
        frames[keyframeName] = value.percent
    })

    return {
        inlineStyle: { animation: animations.join(', ') },
        styleBlocks: generateKeyframesCss(frames),
    }

    function exAnimation(name, value) {
        return `${name} ${value.animation}`
    }

    function nonAnimation(name, value) {
        const animationProperty = {}

        forEachObject(value, (k, v) => {
            if (animationPropertySet.has(k)) {
                animationProperty[k] = v
            }
        })

        const ordered = animationPropertyList.map((k) => animationProperty[k]).filter(Boolean)

        const cssStyleBlock = Object.entries(animationProperty)
            .map(([k, v]) => `${animationPropertyMap[k]}: ${v};`)
            .join(' ')

        return {
            string: [name, ...ordered].join(' '),
            inline: cssStyleBlock,
        }
    }

    function generateKeyframesCss(framesObj) {
        const result = {}

        forEachNestedObject(framesObj, (name, percent, styles) => {
            const block = `    ${percent}% {\n        ${Object.entries(styles)
                .map(([k, v]) => `${camelToKebab(k === 'easing' ? 'animationTimingFunction' : k)}: ${v};`)
                .join('\n        ')}\n    }`

            if (!result[name]) result[name] = []
            result[name].push(block)
        })

        return Object.entries(result).map(([name, blocks]) => ({
            name,
            css: `@keyframes ${name} {\n${blocks.join('\n')}\n}`,
        }))
    }
}

export default buildKeyframesModule
