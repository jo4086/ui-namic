import { forEachObject } from '../shared'
    ;l
// 고정된 animation 속성 리스트
const animationPropertyList = ['duration', 'easing', 'delay', 'iteration', 'direction', 'fillMode', 'playState']
const animationPropertySet = new Set(animationPropertyList)

// JS key → CSS 속성으로 매핑
const animationPropertyMap = {
    duration: 'animation-duration',
    easing: 'animation-timing-function',
    delay: 'animation-delay',
    iteration: 'animation-iteration-count',
    direction: 'animation-direction',
    fillMode: 'animation-fill-mode',
    playState: 'animation-play-state',
}

// 주요 함수
function buildKeyframesBundle(keyframes, baseClassName = '') {
    const exAnimation = (name, value) => `${name} ${value.animation}`

    const nonAnimation = (name, value) => {
        const animationProperty = {}

        forEachObject(value, (k, v) => {
            if (animationPropertySet.has(k)) {
                animationProperty[k] = v
            }
        })

        // 문자열 animation 속성용 (이건 여전히 CSS 명명법 아님)
        const orderedValues = animationPropertyList.map((k) => animationProperty[k]).filter(Boolean)

        // 🔁 CSS 속성용 키-값 블록 (예: animation-timing-function: ease;)
        const cssStyleBlock = animationPropertyList.filter((k) => animationProperty[k] !== undefined).map((k) => `${animationPropertyMap[k]}: ${animationProperty[k]};`)

        return {
            string: [name, ...orderedValues].join(' '),
            inline: cssStyleBlock.join(' '),
        }
    }

    const generateKeyframesCss = (framesObj) => {
        const result = {}

        forEachNestedObject(framesObj, (name, percent, styles) => {
            const block = `    ${percent}% {\n        ${Object.entries(styles)
                .map(([k, v]) => `${camelToKebab(k === 'easing' ? 'animationTimingFunction' : k)}: ${v};`)
                .join('\n        ')}\n    }`

            if (!result[name]) result[name] = []
            result[name].push(block)
        })

        // 결과: [{ type: 'keyframes', name, css }]
        return Object.entries(result).map(([name, blocks]) => ({
            type: 'keyframes',
            name,
            css: `@keyframes ${name} {\n${blocks.join('\n')}\n}`,
        }))
    }

    const keyframesAnalyze = (obj) => {
        const animations = []
        const frames = {}

        forEachObject(obj, (key, value) => {
            const uniqueKeyframeName = `${baseClassName}__${key}`
            const result = typeof value.animation === 'string' ? { string: exAnimation(uniqueKeyframeName, value), inline: '' } : nonAnimation(uniqueKeyframeName, value)

            animations.push(result.string)
            frames[uniqueKeyframeName] = value.percent
            // 필요 시 result.inline 을 styleObj에도 넣을 수 있음
        })

        return {
            inlineStyle: { animation: animations.join(', ') },
            styleBlocks: generateKeyframesCss(frames),
        }
    }

    return keyframesAnalyze(keyframes)
}
