// 📁 _cache.js
const ALLOWED_CACHE_TYPES = ['static', 'logic']

const mainKeyMap = new Map()
const mainCache = new WeakMap()

const helperKeyMap = new Map()
const helperCache = new WeakMap()

const CACHE_REGISTRY = {
    main: [mainKeyMap, mainCache],
    helper: [helperKeyMap, helperCache],
}

function registerCacheType(type) {
    if (!ALLOWED_CACHE_TYPES.includes(type)) {
        throw new Error(`❌ 등록되지 않은 캐시 타입입니다: '${type}'`)
    }

    if (!CACHE_REGISTRY[type]) {
        CACHE_REGISTRY[type] = [new Map(), new WeakMap()]
        console.log(`🛠️  캐시 타입 생성됨: '${type}'`)
    }

    return CACHE_REGISTRY[type]
}

// ─────────────────────────────
// 🔑 내부 key 객체 생성 및 매핑
// ─────────────────────────────

function getInternalKey(path, exportName, type) {
    const [keyMap] = registerCacheType(type)
    const keyString = `${path}::${exportName}`

    if (!keyMap.has(keyString)) {
        keyMap.set(keyString, { path, exportName })
    }

    return keyMap.get(keyString)
}

// ─────────────────────────────
// 📦 캐시된 모듈에서 export 가져오기
// ─────────────────────────────
export async function getCachedExport(path, exportName, type = 'static') {
    const key = getInternalKey(path, exportName, type)
    const [_, valueCache] = registerCacheType(type)

    let mod

    if (!valueCache.has(key)) {
        console.log(`🧩 [cache] 모듈 로드됨: ${path}`)
        mod = await import(path)
        valueCache.set(key, mod)
    } else {
        console.log(`💾 [cache] 캐시에서 사용됨: ${path}`)
        mod = valueCache.get(key)
    }

    const exportValue = mod?.[exportName]
    console.log(`📦 [cache] 반환 export: ${exportName}`, exportValue)
    return exportValue
}
