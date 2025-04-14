const cache = new WeakMap()
const weakCache = new WeakMap()
const debugMap = new Map()

function expensiveOperation(fn) {
    if (weakCache.has(fn)) {
        const val = weakCache.get(fn)
        console.log('💾 캐시에서 반환됨:', val)
        return val
    }

    const result = fn()
    weakCache.set(fn, result)
    debugMap.set(fn, result) // 함수 이름 기준으로 디버깅 가능
    return result
}

function myFunc() {
    return 42
}

function showCache() {
    console.log('📊 현재 캐시 상태:')
    for (const [key, value] of debugMap.entries()) {
        console.log(`  🔑 ${key}: ${value}`)
    }
}

function showWeakCacheStatus(fn) {
    const isCached = weakCache.has(fn)
    const isCachedDebug = debugMap.has(fn)
    console.log(`🔍 [${fn.name}] 캐시됨?`, '[ WeakMap:', isCached, '] [', 'Map:', isCachedDebug, ']')
}

expensiveOperation(myFunc)
// 🔄 새로 계산 중...
// 🧩 캐시에 저장됨: 42

expensiveOperation(myFunc)
// 💾 캐시에서 반환됨: 42
showCache()

// console.log('📊 캐시 확인:', [...debugMap.entries()])
showWeakCacheStatus(myFunc)
// console.log('✅ 캐시 존재 여부:', weakCache.has(myFunc)) // 👉 true 또는 false
