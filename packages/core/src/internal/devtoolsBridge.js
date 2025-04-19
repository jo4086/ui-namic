let validatorCache = null
let validatorReady = false

export async function preloadDevTools() {
    if (validatorCache) return

    try {
        const mod = await import('@dev-tools')
        validatorCache = {
            validateStyleDSLKeys: mod.validateStyleDSLKeys,
            validateHtmlTag: mod.validateHtmlTag,
            validateCssStringPropsForDisplay: mod.validateCssStringPropsForDisplay,
        }
        validatorReady = true
        console.log('[dev-tools] 유효성 검사 활성화됨 ✅')
    } catch {
        validatorCache = {}
        console.warn('[dev-tools] 미설치. 유효성 검사 비활성화 ⚠️')
    }
}
