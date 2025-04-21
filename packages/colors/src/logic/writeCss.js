export function writeCss(map, spectrumFn, options = {}) {
    const { format = 'css', prefix = '--color-' } = options

    const result = {}

    for (const [name, [h, s, l]] of Object.entries(map)) {
        const ramp = spectrumFn(l)

        ramp.forEach((lightness, i) => {
            const level = (i + 1) * 100
            const key = `${name}-${level}`
            const value = `hsl(${h}, ${s}%, ${lightness}%)`
            result[key] = value
        })
    }

    if (format === 'json') {
        return JSON.stringify(result, null, 2)
    }

    if (format === 'scss') {
        return Object.entries(result)
            .map(([k, v]) => `${prefix}${k.replace(/^--/, '')}: ${v};`)
            .join('\n')
    }

    // default: css
    return `:root {\n${Object.entries(result)
        .map(([k, v]) => `  ${prefix}${k}: ${v};`)
        .join('\n')}\n}`
}
