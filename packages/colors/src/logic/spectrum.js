export function getFullSpectrumFromCenter(l) {
    const base = l >= 70 ? 100 - l : l <= 30 ? l : null

    if (l <= 30 || l >= 70) {
        return logic(base, l)
    } else {
        const delta = 100 - l
        const limit = 100 - Math.floor(delta / 3)
        const usable = limit - l
        const step = usable - (usable % 4)
        const stepSize = step / 4

        return Array.from({ length: 9 }, (_, i) => +(l + (i - 4) * stepSize).toFixed(1))
    }

    function logic(base, centerL) {
        const usable = base * (2 / 3)
        const evenUsable = Math.floor(usable)
        const step = evenUsable - (evenUsable % 4)
        const stepSize = step / 4

        return Array.from({ length: 9 }, (_, i) => +(centerL + (i - 4) * stepSize).toFixed(1))
    }
}
