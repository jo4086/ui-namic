import { showOverlayError } from './showOverlayError.js'

export function handleError(message, data = {}, options = {}) {
    const fullMessage = data && Object.keys(data).length ? `${message}\n\nDetails:\n${JSON.stringify(data, null, 2)}` : message

    if (options.showOverlay && typeof window !== 'undefined') {
        showOverlayError(fullMessage)
    }

    const isProd = import.meta?.env?.PROD || process.env.NODE_ENV === 'production'

    if (isProd || options.throwInDev) {
        throw new Error(fullMessage)
    } else {
        console.error('[UINAMIC Error]', message, data)
    }
}
