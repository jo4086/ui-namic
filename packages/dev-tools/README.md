## 캐싱전략

```js
// 📁 _cache.js
const ALLOWED_CACHE_TYPES = ['static', 'logic']

const staticKeyMap = new Map()
const staticCache = new WeakMap()

const logicKeyMap = new Map()
const logicCache = new WeakMap()

const CACHE_REGISTRY = {
    static: [staticKeyMap, staticCache],
    logic: [logicKeyMap, logicCache],
}

function registerCacheType(type) {
    if (!ALLOWED_CACHE_TYPES.includes(type)) {
        throw new Error(`❌ 등록되지 않은 캐시 타입입니다: '${type}'`)
    }

    if (!CACHE_REGISTRY[type]) {
        CACHE_REGISTRY[type] = [new Map(), new WeakMap()]
        console.log(`🛠️  캐시 타입 생성됨: '${type}'`)
    }

    console.log('CACHE_REGISTRY:', CACHE_REGISTRY)
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
export async function getCachedExport(exportName, type = 'static') {
    const importPath = `./${type}/index.js`
    const key = getInternalKey(importPath, exportName, type)
    const [_, valueCache] = registerCacheType(type)

    let mod

    if (!valueCache.has(key)) {
        console.log(`🧩 [cache] 모듈 로드됨: ${importPath}`)
        mod = await import(importPath)
        valueCache.set(key, mod)
    } else {
        console.log(`💾 [cache] 캐시에서 사용됨: ${importPath}`)
        mod = valueCache.get(key)
    }

    const exportValue = mod?.[exportName]
    console.log(`📦 [cache] 반환 export: ${exportName}`, exportValue)
    return exportValue
}

// const key1 = getInternalKey('./static/index.js', 'specialKeySet', 'static')
// const key2 = getInternalKey('./static/index.js', 'specialKeySet', 'static')
// console.log('key1 === key2:', key1 === key2) // ✅ 반드시 true

// const [_, valueCache] = registerCacheType('static')
// valueCache.set(key1, { test: 123 })
// console.log('valueCache.has(key1):', valueCache.has(key1)) // ✅ true
// console.log('valueCache.has(key2):', valueCache.has(key2)) // ✅ key1 === key2면 true여야 함
```

```js
CACHE_REGISTRY: ⏷{static: Array(2), logic: Array(2)}
                  ⏵logic: (2) [Map(0), WeakMap]
                  ⏷static: Array(2)
                    ⏷0: Map(1)
                      ⏷[[Entries]]
                      ⏷0: {"./static/index.js::specialKeySet" => Object}
                          key: "./static/index.js::specialKeySet"
                        ⏵value: {path: './static/index.js', exportName: 'specialKeySet'}
                      size: 1
                    ⏵[[Prototype]]: Map
                  ⏷1: WeakMap
                    ⏷[[Entries]]
                      ⏷0: {Object => Module}
                        ⏵key: {path: './static/index.js', exportName: 'specialKeySet'}
                        ⏵value: Module {Symbol(Symbol.toStringTag): 'Module'}
                    ⏵[[Prototype]]: WeakMap
                    length: 2
                  ⏵[[Prototype]]: Array(0)
                ⏵[[Prototype]]: Object
```
