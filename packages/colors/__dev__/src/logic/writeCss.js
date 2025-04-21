export function writeCss(map, spectrumFn, options = {}) {
    const { format = 'css', prefix = '--color-' } = options

    const result = {}

    // 기본 블랙과 화이트 색상 추가
    const baseColors = [`${prefix}black: hsl(0, 0%, 0%);`, `${prefix}white: hsl(0, 0%, 100%);`]

    // 결과 변수에 기본 색상 추가
    result['baseColors'] = baseColors.join('\n')

    // 색상 그룹별로 처리
    for (const [name, [h, s, l]] of Object.entries(map)) {
        const ramp = spectrumFn(l)

        // 각 색상 그룹에서 레벨을 처리하면서 줄 바꿈 추가
        const group = ramp.map((lightness, i) => {
            const level = (i + 1) * 100
            const key = `${name}-${level}`
            const value = `hsl(${h}, ${s}%, ${lightness}%)`
            return `  ${prefix}${key}: ${value};`
        })

        // 색상 그룹별로 한 줄로 구분
        result[name] = group.join('\n') // 여기서 그룹 내 항목을 줄바꿈으로 구분
    }

    // JSON 형식은 그대로 반환
    if (format === 'json') {
        return JSON.stringify(result, null, 2)
    }

    // SCSS 형식 처리
    if (format === 'scss') {
        return (
            `${result['baseColors']}\n` +
            Object.entries(result)
                .map(([k, v]) => `${v}\n`) // 그룹별로 출력
                .join('')
        )
    }

    // CSS 기본 형식 처리
    return `:root {\n${result['baseColors']}\n${Object.entries(result)
        .map(([k, v]) => `${v}\n`) // 그룹별로 출력
        .join('')}\n}`
}
