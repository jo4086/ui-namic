import { logStyle } from '@debug'

function deepSortObject(obj) {
    if (Array.isArray(obj)) {
        return obj.map(deepSortObject)
    } else if (typeof obj === 'object' && obj !== null) {
        return Object.fromEntries(
            Object.entries(obj)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([k, v]) => [k, deepSortObject(v)])
        )
    }
    return obj
}

export function generateStyleId(styleObj) {
    const sorted = deepSortObject(styleObj)
    // console.log('🔍 정렬된 스타일:', sorted)
    const json = JSON.stringify(sorted)
    // console.log('🔍 stringify:', json)

    const utf8Bytes = new TextEncoder().encode(json)
    // console.log('🔍 stringify', utf8Bytes)

    const binaryStr = Array.from(utf8Bytes, (byte) => String.fromCharCode(byte)).join('')

    // console.log('🔍 binaryStr', binaryStr)

    const base64 = btoa(binaryStr)
    console.log('🔍 base64', base64)

    const uniqueId = 'style-' + base64.slice(0, 10)

    logStyle('unique-id', uniqueId, 'black', '1rem', 1)

    return 'style-' + base64.slice(0, 10)
}

/* 
style-eyJhbGlnbk
style-eyJhbGlnbk
*/

/* 

*/