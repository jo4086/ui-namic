let devTools = null

export async function loadDevToolsIfAvailable() {
    if (typeof window === 'undefined') return null
    if (devTools) return devTools

    try {
        devTools = await import('@uinamic/dev-tools')
        return devTools
    } catch (e) {
        console.warn('[UINAMIC] dev-tools 모듈 없음, dev 기능 비활성화')
        return null
    }
}
