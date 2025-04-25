export function getFullSpectrumFromCenter(l) {
    const minL = 5
    const maxL = 95
    const isLowRange = l <= 50

    const lowRange = isLowRange ? l - minL : maxL - l
    const highRange = isLowRange ? maxL - l : l - minL

    if (isLowRange) {
    }
    // calculate low spectrum
    let lowBias = Math.floor(lowRange * 0.1)
    lowBias += (lowRange - lowBias) % 4
    const lowDelta = lowRange - lowBias
    const lowSteps = smartLowBias(lowBias).map((w) => lowDelta / 4 + w)

    // calculate high spectrum
    let highBias = Math.floor(highRange * 0.1)
    highBias += (highRange - highBias) % 4
    const highDelta = highRange - highBias
    const highSteps = smartHighBias(highBias).map((w) => highDelta / 4 + w)

    const lowValues = isLowRange ? accumulateReverse(l, lowSteps) : accumulate(l, lowSteps)
    const highValues = isLowRange ? accumulate(l, highSteps) : accumulateReverse(l, highSteps)

    const spectrum = [...new Set([...lowValues, ...highValues])].sort((a, b) => a - b)

    console.log('Input lightness:', l)
    // ─────────────── Low Group ───────────────
    console.log('📘 [LOW GROUP]')
    console.log('minL:', minL)
    console.log('lowRange:', lowRange)
    console.log('lowBias:', lowBias)
    console.log('lowDelta:', lowDelta)
    console.log(
        'lowSteps:',
        lowSteps.map((n) => n.toFixed(1))
    )
    console.log(
        'lowValues:',
        lowValues.map((n) => n.toFixed(1))
    )

    // ─────────────── High Group ───────────────
    console.log('📗 [HIGH GROUP]')
    console.log('maxL:', maxL)
    console.log('highRange:', highRange)
    console.log('highBias:', highBias)
    console.log('highDelta:', highDelta)
    console.log(
        'highSteps:',
        highSteps.map((n) => n.toFixed(1))
    )
    console.log(
        'highValues:',
        highValues.map((n) => n.toFixed(1))
    )
    console.log()

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
    const weights = [0, 1, 2, 3]
    for (let i = 0; i < n; i++) {
        const idx = weights[i % 4]
        result[idx]++
    }
    return result.reverse()
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
