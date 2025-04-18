let count = 0

export function isRenderableChildren(children) {
    if (typeof children === 'object') {
        console.groupCollapsed(`🧩 Renderable children #${count}`)

        if (Array.isArray(children)) {
            console.log('📦 Array children:', children)

            children.forEach((v, i) => {
                if (isRenderableElement(v)) {
                    console.log(`  ✅ [${i}] JSX Element or Component`, v)
                } else {
                    console.log(`  ⛔ [${i}] Non-renderable`, v)
                }
            })
        } else {
            if (isRenderableElement(children)) {
                console.log('✅ Single JSX Element or Component', children)
            } else {
                console.log('⛔ Single object is not renderable', children)
            }
        }

        console.groupEnd()
    }

    count++
}

function isRenderableElement(obj) {
    return !!obj?.['$$typeof']
}
