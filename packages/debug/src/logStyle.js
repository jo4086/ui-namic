const colorMap = {
    orange: { bg: 'orange', color: 'black' },
    yellow: { bg: 'yellow', color: 'black' },
    black: { bg: 'black', color: 'white' },
    coral: { bg: 'coral', color: 'black' },
    white: { bg: 'white', color: 'black' },
    none: { bg: 'none', color: 'inherit' },
    skyblue: { bg: 'skyblue', color: 'black' },
    lightGreen: { bg: 'lightGreen', color: 'black' },

    purple100: { bg: '#f3e8ff', color: '#3b0764' },
    purple200: { bg: '#e9d5ff', color: '#3b0764' },
    purple300: { bg: '#d8b4fe', color: '#3b0764' },
    purple400: { bg: '#c084fc', color: '#3b0764' },
    purple500: { bg: '#a855f7', color: 'white' },
    purple600: { bg: '#9333ea', color: 'white' },
    purple700: { bg: '#7e22ce', color: 'white' },
    purple800: { bg: '#6b21a8', color: 'white' },
    purple900: { bg: '#581c87', color: 'white' },
}

let count = 1

export function logGroup(label = '') {
    const title = `group${count}${label ? ` - ${label}` : ''}`
    const style = `background:#eee;color:#000;font-size:2rem;padding:2px 6px 4px 4px;border-radius:4px;border:1px solid black;`
    count += 1

    console.groupCollapsed(`%c${title}`, style)
}

export function logStyle(label, value, background, fontSize, isOpen) {
    const stack = new Error().stack
    const rawLine = stack?.split('\n')[2]?.trim() || ''
    const cleanedLine = rawLine.replace(/\?t=\d+/, '')
    const fileMatch = cleanedLine.match(/\/([^/]+\.(js|ts|jsx|tsx)):(\d+)/)
    const fileLabel = fileMatch ? `→ ${fileMatch[1]}:${fileMatch[3]}` : 'unknown'

    const icon = '🎯'
    const colorEntry = colorMap[background] ?? { bg: 'none', color: 'inherit' }
    const setBackground = colorEntry.bg
    const setColor = colorEntry.color

    const setFontSize = fontSize ?? '1.5rem'
    const labelStyle = `color:${setColor};background:${setBackground};font-size:${setFontSize};padding:4px 8px 6px 4px;border-radius:4px;border:1px solid rgba(0,0,0,0.3)`
    const subStyle = 'color:#888;font-size:1rem;padding:2px;position:absolute;top:30px'

    // 그룹 열기

    !!isOpen ? console.group(`%c${icon} ${label}%c${fileLabel}`, labelStyle, subStyle) : console.groupCollapsed(`%c${icon} ${label}%c${fileLabel}`, labelStyle, subStyle)

    // console.groupCollapsed(`%c${icon} ${label}%c${fileLabel}`, labelStyle, subStyle)

    // 객체인 경우: key마다 출력
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                console.log(`${key}:`, value[key])
            }
        }
    } else {
        console.log(value)
    }

    console.groupEnd()
}

// export function logStyle(label, value, color, background, fontSize) {
//     // if (!isDev) return
//     console.log('isDEV, isDebug:', isDev, isDebug)

//     if (!isDev || !isDebug) return
//     const stack = new Error().stack
//     const rawLine = stack?.split('\n')[2]?.trim() || ''

//     // ?t=... 제거
//     const cleanedLine = rawLine.replace(/\?t=\d+/, '')

//     // 파일명과 줄번호 추출
//     const fileMatch = cleanedLine.match(/\/([^/]+\.js):(\d+)/)
//     const fileLabel = fileMatch ? `${fileMatch[1]}:${fileMatch[2]}` : 'unknown'

//     const icon = '🎯'
//     const setColor = color ?? 'black'
//     const setBackground = background ?? 'white'
//     const setFontSize = fontSize ?? '2rem'

//     const style = `color:${setColor};background:${setBackground};font-size:${setFontSize};padding:5px 10px 5px 3px;border-radius:4px`
//     const name = `${icon} ${label}`

//     console.groupCollapsed(`%c${name}`, style, `.${fileLabel}`)
//     console.log(value)
//     console.groupEnd()
// }

export function logStyle2({ label, value, color = 'white', background = 'black', fontSize = '3rem', icon = '🎯' }) {
    // if (!isDev) return

    const style = `color:${color};background:${background};font-size:${fontSize};padding:5px 10px 5px 3px;border-radius:4px`
    const name = `${icon} ${label}`
    console.groupCollapsed(`%c${name}`, style)
    console.log(value)
    console.groupEnd()
}
