let validatorCache = null
let preloadStarted = false

async function loadDevTools() {
    if (validatorCache || preloadStarted) return validatorCache
    preloadStarted = true
    try {
        const mod = await import('@dev-tools')
        validatorCache = {
            validateStyleDSLKeys: mod.validateStyleDSLKeys,
            validateHtmlTag: mod.validateHtmlTag,
            validateCssStringPropsForDisplay: mod.validateCssStringPropsForDisplay,
        }
        console.log('[dev-tools] 유효성 검사 활성화됨 ✅')
    } catch {
        validatorCache = {}
        console.warn('[dev-tools] 미설치...')
    }

    return validatorCache // ✅ 반드시 반환해줘야 .then(...)에서 접근 가능
}
loadDevTools() // ✅ 최초 1회 비동기 시작

export function validateStyleDSLKeys(props) {
    loadDevTools().then((validators) => {
        validators?.validateStyleDSLKeys?.(props) // ✅ 이제 정상 작동
    })
}
