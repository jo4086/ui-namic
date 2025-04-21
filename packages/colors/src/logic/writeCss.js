export function writeCss(map, spectrumFn, options = {}) {
    const { format = 'css', prefix = '--color-' } = options

    // base colors
    const baseColors = [`  ${prefix}black: hsl(0, 0%, 0%);`, `  ${prefix}white: hsl(0, 0%, 100%);`]
    const baseColorsBlock = baseColors.join('\n')

    const groupBlocks = []
    const groupFlatJson = {}

    for (const [name, [h, s, l]] of Object.entries(map)) {
        const ramp = spectrumFn(l)

        const group = ramp
            .map((lightness, i) => {
                const level = (i + 1) * 100
                const key = `${name}-${level}`
                const value = `hsl(${h}, ${s}%, ${lightness}%)`

                if (format === 'json') {
                    groupFlatJson[key] = value
                    return null
                }

                return `  ${prefix}${key}: ${value};`
            })
            .filter(Boolean)

        groupBlocks.push(group.join('\n'))
    }

    if (format === 'json') {
        return JSON.stringify(groupFlatJson, null, 2)
    }

    if (format === 'scss') {
        return [baseColorsBlock, '', ...groupBlocks].join('\n\n')
    }

    return `:root {\n${baseColorsBlock}\n\n${groupBlocks.join('\n\n')}\n}`
}
