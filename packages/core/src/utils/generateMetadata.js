import { prefix } from '@debug'

// 안정적으로 stringify
function stableStringify(obj) {
    if (Array.isArray(obj)) {
        return `[${obj.map(stableStringify).join(',')}]`
    } else if (obj && typeof obj === 'object') {
        const keys = Object.keys(obj).sort()
        return `{${keys.map((k) => `"${k}":${stableStringify(obj[k])}`).join(',')}}`
    } else {
        return JSON.stringify(obj)
    }
}

// 경량 문자열 해시 함수 (djb2 해시 알고리즘)
function hashString(str) {
    let hash = 5381
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 33) ^ str.charCodeAt(i)
    }
    return (hash >>> 0).toString(16) // 16진수 문자열로 반환
}

// 중첩 객체 → 고유 ID 반환
export function generateMetadata(obj, type) {
    const tagToClassPrefix = {
        button: 'Button',
        div: 'Box',
        input: 'InputField',
    }

    const typeName = tagToClassPrefix[type] || 'Element'

    const uniqueId = hashString(stableStringify(obj))

    const baseClassName = `${prefix}_${typeName}_${uniqueId}`
    const dynamicClassName = `--${prefix}--dynamic`
    const fullClassName = `${baseClassName} ${dynamicClassName}`
    const selectorBase = `.${baseClassName}`
    const selectorDynamic = `.${baseClassName}.${dynamicClassName}`
    const keyfraemsName = `@keyframes ${baseClassName}_`
    const dynamicKeyfraemsName = `@keyframes ${baseClassName}_dynamic_`

    return { uniqueId, baseClassName, dynamicClassName, fullClassName, selectorBase, selectorDynamic, keyfraemsName, dynamicKeyfraemsName }
}

function safeStableStringify(obj, seen = new WeakSet()) {
    if (obj && typeof obj === 'object') {
        if (seen.has(obj)) return '"[Circular]"'
        seen.add(obj)

        if (Array.isArray(obj)) {
            return `[${obj.map((item) => safeStableStringify(item, seen)).join(',')}]`
        }

        const keys = Object.keys(obj).sort()
        return `{${keys.map((k) => `"${k}":${safeStableStringify(obj[k], seen)}`).join(',')}}`
    } else {
        return JSON.stringify(obj)
    }
}

const idCache = new WeakMap()

function generateIdOnce(obj) {
    if (idCache.has(obj)) return idCache.get(obj)
    const id = hashString(safeStableStringify(obj))
    idCache.set(obj, id)
    return id
}
