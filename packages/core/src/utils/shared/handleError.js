const isBrowser = typeof window !== 'undefined'

// 브라우저에서도 안전하게 환경 체크
const getEnv = () => {
    if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV) {
        return process.env.NODE_ENV
    }

    // Vite 사용 시엔 import.meta.env를 쓰자
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

    const fullMessage = data ? `${message}\nDetails:\n${JSON.stringify(data, null, 2)}` : message

    if (!isDev || throwInDev) {
        throw new Error(fullMessage)
    } else {
        if (data) {
            console.error(`%c[UINAMIC Error]%c ${message}`, 'color:red;font-weight:bold;', 'color:inherit;')

            console.error('Errors\n', data)
        }
    }
}
