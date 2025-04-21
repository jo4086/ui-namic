export function writeCss(map, spectrumFn) {
    const lines = []

    lines.push(`  --color-black: hsl(0, 0%, 0%);`)
    lines.push(`  --color-white: hsl(0, 0%, 100%);`)

    for (const [name, [h, s, l]] of Object.entries(map)) {
        const ramp = spectrumFn(l)
        lines.push(`\n  /*------------------*/`)
        lines.push(`  /*  ${name}  */`)
        lines.push(`  /*------------------*/`)
        ramp.forEach((lightness, i) => {
            const level = (i + 1) * 100
            lines.push(`  --color-${name}-${level}: hsl(${h}, ${s}%, ${lightness}%);`)
        })
    }

    return `:root {\n${lines.join('\n')}\n}`
}
