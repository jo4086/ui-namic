import { useState, useCallback } from 'react'
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

  // ✅ DOM 이벤트 기준으로 변환된 triggeredEvents
  const domTriggeredEvents = triggeredEvents.map((evt) => dxEventToDomEventMap[evt])

  const [triggeredMap, setTriggeredMap] = useState(
    Object.fromEntries(domTriggeredEvents.map((evt) => [evt, false]))
  )

  const [countMap, setCountMap] = useState(
    Object.fromEntries(domTriggeredEvents.map((evt) => [evt, 0]))
  )

  const handleDynamicEvents = {}

  triggeredEvents.forEach((evt) => {
    const strategy = strategyMap[evt] || 'on'
    const domEvent = dxEventToDomEventMap[evt]

    handleDynamicEvents[domEvent] = useCallback(
      (e) => {
        setTriggeredMap((prev) => ({
          ...prev,
          [domEvent]:
            strategy === 'toggle' ? !prev[domEvent] :
            strategy === 'on'     ? true :
            strategy === 'off'    ? false :
            true, // count의 경우 기본 true
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

  const isTriggered = Object.values(triggeredMap).some(Boolean)

  return {
    triggeredMap,
    countMap,
    handleDynamicEvents,
    isTriggered,
  }
}

export default useDynamicTrigger_v2
