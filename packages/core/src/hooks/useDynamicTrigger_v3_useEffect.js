import { useEffect, useState, useCallback } from 'react'
import { dxEventToDomEventMap } from '../utils/constants'

const defaultTriggerStrategyMap = {
    onClick: 'toggle',
    onFocus: 'on',
    onBlur: 'off',
    onMouseEnter: 'on',
    onMouseLeave: 'off',
    onKeyDown: 'on',
    onTouchStart: 'on',
    onPointerDown: 'on',
}

const useDynamicTrigger_v2 = ({ triggeredEvents = [], restProps = {}, dyState = {} }) => {
    const strategyMap = {
        ...defaultTriggerStrategyMap,
        ...dyState,
    }

    const domTriggeredEvents = triggeredEvents.map((evt) => dxEventToDomEventMap[evt])

    const [triggeredMap, setTriggeredMap] = useState(Object.fromEntries(domTriggeredEvents.map((evt) => [evt, false])))

    const [countMap, setCountMap] = useState(Object.fromEntries(domTriggeredEvents.map((evt) => [evt, 0])))

    const handleDynamicEvents = {}

    domTriggeredEvents.forEach((domEvent) => {
        const dxKey = Object.keys(dxEventToDomEventMap).find((key) => dxEventToDomEventMap[key] === domEvent)
        const strategy = strategyMap[dxKey] || 'on'

        handleDynamicEvents[domEvent] = useCallback(
            (e) => {
                setTriggeredMap((prev) => ({
                    ...prev,
                    [domEvent]: strategy === 'toggle' ? !prev[domEvent] : true,
                }))

                if (strategy === 'count') {
                    setCountMap((prev) => ({
                        ...prev,
                        [domEvent]: prev[domEvent] + 1,
                    }))
                }

                if (typeof restProps[domEvent] === 'function') {
                    restProps[domEvent](e)
                }
            },
            [restProps[domEvent]]
        )
    })

    // ✅ 카운트가 0이면 자동으로 스타일도 false 처리
    useEffect(() => {
        domTriggeredEvents.forEach((domEvent) => {
            if (countMap[domEvent] === 0 && triggeredMap[domEvent]) {
                setTriggeredMap((prev) => ({ ...prev, [domEvent]: false }))
            }
        })
    }, [countMap])

    const isTriggered = Object.values(triggeredMap).some(Boolean)

    return {
        triggeredMap,
        countMap,
        handleDynamicEvents,
        isTriggered,
    }
}

export default useDynamicTrigger_v2