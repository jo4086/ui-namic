import { showOverlayError } from './showOverlayError.js'

export function handleError(message, data = {}, options = {}) {
    const code = options.code || 'default'
    const fullMessage = formatErrorMessage(message, data)

    if (options.showOverlay && typeof window !== 'undefined') {
        showOverlayError(fullMessage, code)
    }

    const isProd = import.meta?.env?.PROD || process.env.NODE_ENV === 'production'

    if (isProd || options.throwInDev) {
        throw new Error(fullMessage)
    } else {
        console.error('\n🚨 [UINAMIC ERROR]', '\n' + fullMessage)
    }
}

// 메시지 포맷 헬퍼 (옵션)
function formatErrorMessage(message, data) {
    if (!data || Object.keys(data).length === 0) return message

    const lines = Object.entries(data).map(([k, v]) => {
        const val = typeof v === 'object' ? JSON.stringify(v, null, 2) : String(v)
        return `• ${k}: ${val}`
    })

    return `${message}\n\n${lines.join('\n')}`
}

// V2
// const overlayErrorMap = new Map()

// export function handleError(message, data = {}, options = {}) {
//     const fullMessage = buildPreviewMessage(message, data)
//     const code = options.code || 'UNKNOWN'

//     if (options.showOverlay && typeof window !== 'undefined') {
//         overlayErrorMap.set(code, fullMessage)
//         showOverlayError(fullMessage, code)
//     }

//     if (isProd || options.throwInDev) {
//         throw new Error(fullMessage)
//     } else {
//         console.error('\n🚨 [UINAMIC ERROR]', '\n' + fullMessage)
//     }
// }

// export function removeOverlayError(code) {
//     if (overlayErrorMap.has(code)) {
//         overlayErrorMap.delete(code)
//         hideOverlayError(code)
//     }
// }

// V1
// export function handleError(message, data = {}, options = {}) {
//     const fullMessage = data && Object.keys(data).length ? `${message}\n\n\n${JSON.stringify(data, null, 2)}` : message

//     if (options.showOverlay && typeof window !== 'undefined') {
//         showOverlayError(fullMessage)
//     }

//     const isProd = import.meta?.env?.PROD || process.env.NODE_ENV === 'production'

//     if (isProd || options.throwInDev) {
//         throw new Error(fullMessage)
//     } else {
//         console.error('[UINAMIC Error]', message, data)
//     }
// }
