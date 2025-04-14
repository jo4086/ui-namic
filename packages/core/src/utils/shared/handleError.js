const isBrowser = typeof window !== 'undefined'

// 브라우저에서 안전하게 환경 체크
const getEnv = () => {
    if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV) {
        return process.env.NODE_ENV
    }

    // Vite 사용 시엔 import.meta.env
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.MODE) {
        return import.meta.env.MODE
    }

    // 기본 fallback
    return 'production'
}

export const handleError = (message, data, options = {}) => {
    const env = options.env || getEnv()
    const debugMode = options.debugMode ?? import.meta.env?.VITE_UINAMIC_DEBUG === 'true'
    const isDev = env !== 'production' || debugMode
    const throwInDev = options.throwInDev ?? false
    const showOverlay = options.showOverlay ?? false

    const fullMessage = data ? `${message}\n\nDetails:\n${JSON.stringify(data, null, 2)}` : message

    if (showOverlay && typeof window !== 'undefined') {
        showOverlayError(fullMessage)
    }

    if (!isDev || throwInDev) {
        throw new Error(fullMessage)
    } else {
        if (data) {
            console.error(`%c[UINAMIC Error]%c ${message}`, 'color:red;font-weight:bold;', 'color:inherit;')
            console.error('Errors\n', data)
        }
    }
}

// export const handleError = (message, data, options = {}) => {
//     const env = options.env || getEnv()
//     const debugMode = options.debugMode ?? import.meta.env?.VITE_UINAMIC_DEBUG === 'true'
//     const isDev = env !== 'production' || debugMode
//     const throwInDev = options.throwInDev ?? false

//     const fullMessage = data ? `${message}\nDetails:\n${JSON.stringify(data, null, 2)}` : message

//     if (!isDev || throwInDev) {
//         throw new Error(fullMessage)
//     } else {
//         if (data) {
//             console.error(`%c[UINAMIC Error]%c ${message}`, 'color:red;font-weight:bold;', 'color:inherit;')

//             console.error('Errors\n', data)
//         }
//     }
// }

function showOverlayError(message) {
    if (document.getElementById('__uinamic_error_overlay__')) return

    const overlay = document.createElement('div')
    overlay.id = '__uinamic_error_overlay__'
    overlay.style.border = '1px solid red'
    overlay.style.position = 'fixed'
    overlay.style.top = '0'
    overlay.style.left = '0'
    overlay.style.width = '100vw'
    overlay.style.height = '100vh'
    overlay.style.background = 'rgba(0, 0, 0, 0.7)'
    overlay.style.color = 'white'
    overlay.style.fontSize = '1.5rem'
    overlay.style.lineHeight = '1.6'
    overlay.style.padding = '2rem'
    overlay.style.zIndex = '99999'
    overlay.style.whiteSpace = 'pre-wrap'
    overlay.style.fontFamily = 'monospace'
    overlay.innerText = `🚨 UINAMIC ERROR\n\n${message}`

    document.body.appendChild(overlay)
}

/* 

export const handleError = (message, data, options = {}) => {
    const env = options.env || getEnv()
    const debugMode = options.debugMode ?? import.meta.env?.VITE_UINAMIC_DEBUG === 'true'
    const isDev = env !== 'production' || debugMode
    const throwInDev = options.throwInDev ?? false

    const fullMessage = data ? `${message}\nDetails:\n${JSON.stringify(data, null, 2)}` : message

    if (!isDev || throwInDev) {
        throw new Error(fullMessage)
    } else {
        if (data) {
            console.error(`%c⚠️ [UINAMIC Error]%c ${message.message} <%c${message.error}%c>`, 'color:red;font-weight:bold;', 'color:inherit;', 'text-decoration: underline;text-decoration-color: blue;color:inherit;padding:1px;', 'padding:1px')

            console.error('Errors\n', data)
        }
    }
}

*/
