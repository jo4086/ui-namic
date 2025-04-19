// @uinamic-system/utils/shared/camelToKebab

export const camelToKebab = (str) => {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export default camelToKebab
