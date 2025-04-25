export function getFullSpectrumFromCenter(centerL, limit = 5) {
    const splitRange = centerL <= 22 || centerL >= 78
    const getLimit = getDynamicLimit(splitRange, limit)
    const maxL = 100 - getLimit
    const isLowRange = centerL <= 50

    const lowRange = isLowRange ? centerL - getLimit : maxL - centerL
    const highRange = isLowRange ? maxL - centerL : centerL - getLimit

    if (splitRange) {
        const lowRange = isLowRange ? centerL - getLimit : maxL - centerL
        const highRange = lowRange * 4

        const result = calculateSpectrum(centerL, lowRange, highRange, isLowRange)

        return result
    } else {
        const result = calculateSpectrum(centerL, lowRange, highRange, isLowRange)

        return result
    }
}

function getDynamicLimit(splitRange, defaultLimit = 5) {
    if (splitRange) return 3
    return defaultLimit
}

function calculateSpectrum(centerL, lowRange, highRange, isLowRange) {
    let lowBias = Math.floor(lowRange * 0.1)
    lowBias += (lowRange - lowBias) % 4
    const lowDelta = lowRange - lowBias

    // calculate high spectrum
    let highBias = Math.floor(highRange * 0.1)
    highBias += (highRange - highBias) % 4
    const highDelta = highRange - highBias

    let lowSteps
    let lowValues

    let highSteps
    let highValues

    if (isLowRange) {
        lowSteps = smartLowBias(lowBias).map((w) => lowDelta / 4 + w)
        lowValues = accumulateReverse(centerL, lowSteps)

        highSteps = smartHighBias(highBias)
            .map((w) => highDelta / 4 + w)
            .reverse()
        highValues = accumulate(centerL, highSteps)
    } else {
        lowSteps = smartLowBias(lowBias)
            .map((w) => lowDelta / 4 + w)
            .reverse()
        lowValues = accumulate(centerL, lowSteps)

        highSteps = smartHighBias(highBias).map((w) => highDelta / 4 + w)
        highValues = accumulateReverse(centerL, highSteps)
    }

    const spectrum = [...new Set([...lowValues, ...highValues])].sort((a, b) => a - b)

    console.log('')
    console.log('lowData')
    console.log('lowBias:', lowBias)
    console.log('lowDelta:', lowDelta)
    console.log('lowSteps:', lowSteps)
    console.log('lowValues:', lowValues)

    console.log('')
    console.log('highData')
    console.log('highBias:', highBias)
    console.log('highDelta:', highDelta)
    console.log('highSteps:', highSteps)
    console.log('highValues:', highValues)
    console.log('spectrum:', spectrum)
    console.log('process end')
    return spectrum
}

function smartLowBias(total) {
    const result = [0, 0, 0, 0]
    for (let i = 0; i < total; i++) {
        const index = 3 - (i % 4)
        result[index]++
    }
    return result
}

function smartHighBias(n) {
    const result = [0, 0, 0, 0]
    const weights = [3, 2, 1, 0] // 큰 쪽부터 우선 분배
    for (let i = 0; i < n; i++) {
        const idx = weights[i % 4]
        result[idx]++
    }
    return result
}

function accumulate(start, steps) {
    return steps.reduce(
        (acc, curr) => {
            const last = acc[acc.length - 1]
            return [...acc, +(last + curr).toFixed(1)]
        },
        [start]
    )
}

function accumulateReverse(end, steps) {
    return steps.reduceRight(
        (acc, curr) => {
            const next = acc[0]
            return [+(next - curr).toFixed(1), ...acc]
        },
        [end]
    )
}
