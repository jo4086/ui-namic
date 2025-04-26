let validatorCache = null
let preloadStarted = false

async function loadDevTools() {
    if (validatorCache || preloadStarted) return validatorCache
    preloadStarted = true
    try {
        const mod = await import('@uinamic/dev-tools')
        validatorCache = {
            validateStyleDSLKeys: mod.validateStyleDSLKeys,
            validateHtmlTag: mod.validateHtmlTag,
            validateCssStringPropsForDisplay: mod.validateCssStringPropsForDisplay,
            validateDisplay: mod.validateDisplay, // 추가
        }
        console.log('[dev-tools] 유효성 검사 활성화됨 ✅')
    } catch {
        validatorCache = {}
        console.warn('[dev-tools] 미설치...')
    }

    return validatorCache // 반드시 반환해줘야 .then(...)에서 접근 가능
}
loadDevTools() // 최초 1회 비동기 시작

export function validateStyleDSLKeys(props) {
    loadDevTools().then((validators) => {
        validators?.validateStyleDSLKeys?.(props)
    })
}

export function validateCssStringPropsForDisplay(props, display) {
    loadDevTools().then((validators) => {
        validators?.validateCssStringPropsForDisplay?.(props, display)
    })
}

export function validateHtmlTag(props) {
    loadDevTools().then((validators) => {
        validators?.validateHtmlTag?.(props)
    })
}

export function validateDisplay(display, type) {
    loadDevTools().then((validators) => {
        validators?.validateDisplay?.(display, type)
    })
}
