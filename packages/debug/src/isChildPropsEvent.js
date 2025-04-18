const styleTriggerOnEventList = ['onClick', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur', 'onKeyDown', 'onTouchStart', 'onPointerDown']
const styleTriggerOnEventSet = new Set(styleTriggerOnEventList)

export function isChildPropsEvent(children) {
    const exProps = children?.props
    if (!exProps) return false

    const matchedEvents = Object.entries(exProps).filter(([key, value]) => styleTriggerOnEventSet.has(key) && typeof value === 'function')

    console.log('exProps"', exProps)
    console.log('matchedEvents"', matchedEvents)

    if (matchedEvents.length > 0) {
        console.groupCollapsed('🎯 이벤트 핸들러 존재')
        matchedEvents.forEach(([key, value]) => {
            console.log(`✅ ${key}`, value)
        })
        console.groupEnd()
        return true
    }

    return false
}

// export function isChildPropsEvent(children) {
//     const exProps = children?.props
//     if (!exProps) return false

//     return Object.keys(exProps).some((key) => styleTriggerOnEventSet.has(key))
// }
