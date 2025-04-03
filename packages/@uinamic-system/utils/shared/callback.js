// @uinamic-system/utils/shared/callback.js

export function forEachObject(obj, callback) {
    for (const [key, value] of Object.entries(obj)) {
        callback(key, value)
    }
}

export function forEachNestedObject(obj, callback) {
    for (const [outerKey, outerValue] of Object.entries(obj)) {
        for (const [innerKey, innerValue] of Object.entries(outerValue)) {
            callback(outerKey, innerKey, innerValue)
        }
    }
}
