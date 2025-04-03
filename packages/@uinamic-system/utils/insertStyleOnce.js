// @uinamic-system//insertStyleOnce.js

const insertedStyleIds = new Set() // 글로벌 범위 캐시

function insertStyleOnce(id, cssText) {
    if (insertedStyleIds.has(id)) return

    const style = document.createElement('style')
    style.setAttribute('data-style-id', id)
    style.textContent = cssText
    document.head.appendChild(style)

    insertedStyleIds.add(id)
    console.log('insertStyleIds:', insertedStyleIds)
}

export default insertStyleOnce
