// @uinamic-system/hook/useDynamicTrigger.js

import { useState, useCallback } from 'react'

const useDynamicTrigger = (dynamicTrigger) => {
    const [isTriggered, setIsTriggered] = useState(false)

    const { dynamicType, onEvent } = dynamicTrigger

    // 이벤트를 처리하고 즉시 결과를 반영
    const handleDynamicEvent = useCallback(
        (event) => {
            if (dynamicType && typeof onEvent === 'function') {
                const inputValue = event.target?.value || null

                if (dynamicType === 'onChange') {
                    inputValue ? setIsTriggered(true) : setIsTriggered(false)
                } else if (dynamicType === 'onClick') {
                    setIsTriggered((prev) => !prev) // 토글
                } else if (dynamicType === 'onMouseEnter') {
                    setIsTriggered(true) // 마우스 진입 시 활성화
                } else if (dynamicType === 'onMouseLeave') {
                    setIsTriggered(false) // 마우스 나갈 때 비활성화
                }

                // 사용자 정의 이벤트 실행
                onEvent(event)
            }
        },
        [dynamicType, onEvent]
    )

    return { isTriggered, handleDynamicEvent }
}

export default useDynamicTrigger
