export const reMapKeys = (obj, keyMap) => {
    const result = {}
    for (const key in obj) {
        const value = obj[key]
        const newKey = keyMap[key] || key
        console.log('newKey:', newKey)
        result[newKey] = value
    }
    return result
}
