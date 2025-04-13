export function isRenderableChildren(children) {
    if (typeof children === 'object') {
        if (Array.isArray(children)) {
            console.log('Array children:', children)

            children.forEach((v, i) => {
                if (isCompo(v)) {
                    console.log(`[${i}] 배열 태그 컴포넌트`, v)
                } else {
                    console.log(`[${i}] 일반 객체 (렌더 불가)`, v)
                }
            })
        } else {
            if (isCompo(children)) {
                console.log('단일 태그 컴포넌트', children)
            } else {
                console.log('단일 일반 객체 (렌더 불가)', children)
            }
        }
    }
}

function isCompo(object) {
    return !!object?.['$$typeof']
}
