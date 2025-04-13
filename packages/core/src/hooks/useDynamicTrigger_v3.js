import { useState, useEffect, useCallback, useMemo } from 'react'
import { dxEventToDomEventMap } from '../utils/constants'

// 고정값
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

const useDynamicTrigger_v3 = ({ triggeredEvents = [], restProps = {}, dyState = {}, watchValueMap = {} }) => {
    const strategyMap = {
        ...defaultTriggerStrategyMap,
        ...dyState,
    }

    const domTriggeredEvents = triggeredEvents.map((evt) => dxEventToDomEventMap[evt])

    const [triggeredMap, setTriggeredMap] = useState(Object.fromEntries(domTriggeredEvents.map((evt) => [evt, false])))

    const [countMap, setCountMap] = useState(Object.fromEntries(domTriggeredEvents.map((evt) => [evt, 0])))

    // ✅ [신규] dyState 기반으로 count strategy 자동 매핑
    const resolvedWatchMap = useMemo(() => {
        const map = {}
        for (const [dxKey, strategy] of Object.entries(strategyMap)) {
            const domEvent = dxEventToDomEventMap[dxKey]

            if (strategy === 'count') {
                // 1순위: watchValueMap[dxKey]
                // 2순위: watchValueMap[strategy] = watchValueMap['count']
                const val = watchValueMap?.[dxKey] ?? watchValueMap?.[strategy]
                if (val !== undefined) {
                    map[domEvent] = val
                }
            }
        }
        return map
    }, [watchValueMap, strategyMap])

    // 이벤트 핸들러 생성
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

    // ✅ count = 0일 경우 자동으로 트리거 false 처리
    useEffect(() => {
        const updated = { ...triggeredMap }
        let shouldUpdate = false

        domTriggeredEvents.forEach((domEvent) => {
            const dxKey = Object.keys(dxEventToDomEventMap).find((key) => dxEventToDomEventMap[key] === domEvent)
            const strategy = strategyMap[dxKey]
            const externalValue = resolvedWatchMap?.[domEvent]

            if (strategy === 'count' && externalValue === 0 && triggeredMap[domEvent] === true) {
                updated[domEvent] = false
                shouldUpdate = true
            }
        })

        if (shouldUpdate) setTriggeredMap(updated)
    }, [resolvedWatchMap])

    const isTriggered = Object.values(triggeredMap).some(Boolean)

    return {
        triggeredMap,
        countMap,
        handleDynamicEvents,
        isTriggered,
    }
}

export default useDynamicTrigger_v3
