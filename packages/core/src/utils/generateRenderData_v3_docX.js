// @uinamic-system/generateRenderData_v3.js

import { santizeStyle, normalizeStyle, santizeStyle_v2 } from '../utils'
import useDynamicTrigger from '../hooks/useDynamicTrigger'
import useDynamicTrigger_v2 from '../hooks/useDynamicTrigger_v2'
import useDynamicTrigger_v3 from '../hooks/useDynamicTrigger_v3'

import normalizeBaseStyle from './normalizeBaseStyle'
import normalizeDom from './normalizeDOM'
import { dxEventToDomEventMap, normalizeDyKeyToEventKey, styleTriggerDyEventSet } from './constants'
import { forEachObject } from './shared'
import normalizeStyle_v2 from './normalizeStyle_v2'

import { generateMetadata } from './generateMetadata'
import generateMetadata_v2 from './generateMetadata_v2'

import { logStyle, isRenderableChildren, isChildPropsEvent } from '@debug'
import validateHtmlTag from './validators/validateHtmlTag'

// HTML5 void 요소들 (children 허용 X)
const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])

const generateRenderData_v3 = ({ itemName, type: defaultType = 'div', display: defaultDisplay = 'block', dynamicType: defaultDynamicType = undefined, baseStyle: defaultBaseStyle = {} } = {}) => {
    return function GeneratedComponent({ children, type, display, dynamicType, dynamicStyle = {}, style, className, media, keyframes, dyOrder = [], dyState, watchValueMap, ...restProps }) {

        if (typeof restProps.onClick === 'function') {
            const originalCode = restProps.onClick.toString()
            // console.log('📦 onClick 원형:', originalCode)
            // console.log('📦 onClick 실제:', restProps.onClick)
        }

        // 1. rest 정제
        // rest.(dyClick, dyFocus) => click, focus... 로 변경후 rest에서 제거
        forEachObject(restProps, (k, v) => {
            const dxKey = normalizeDyKeyToEventKey(k)
            if (dxKey) {
                dynamicStyle[dxKey] = v
                delete restProps[k]
            }
        })

        // 디스플레이 병합
        const displayPriority = [defaultDisplay, display, dynamicStyle?.display, style?.display]
        const resolvedDisplay = [...displayPriority].reverse().find((v) => v !== undefined)

        // tag 병합
        const resolvedType = type || defaultType
        validateHtmlTag(resolvedType)

        // style 병합
        const mergedStyle = {
            ...defaultBaseStyle,
            ...dynamicStyle,
            ...(keyframes && { keyframes }),
            ...(media && { media }),
            ...style,
        }

        const resolvedDynamicType = dynamicType || defaultDynamicType

        const { styleProps, triggeredEvents } = santizeStyle_v2({
            type: resolvedType,
            display: resolvedDisplay,
            dynamicStyle: mergedStyle,
        })

        const { handleDynamicEvents, triggeredMap, countMap } = useDynamicTrigger_v3({
            triggeredEvents: ['click'],
            restProps,
            dyState: { click: 'count' },
            watchValueMap, 
        })

        const META = generateMetadata_v2(styleProps, resolvedType, {
            userClassName: className,
            triggeredMap,
            triggeredEvents: triggeredEvents.map((evt) => dxEventToDomEventMap[evt]),
        })

        normalizeDom(styleProps, META)
        normalizeStyle(styleProps, META)
        normalizeStyle_v2(styleProps, META)

        const Tag = resolvedType

        const eventHandlers = Object.fromEntries(
            triggeredEvents.map((evt) => [
                dxEventToDomEventMap[evt], 
                handleDynamicEvents[dxEventToDomEventMap[evt]],
            ])
        )

        const baseProps = {
            ...restProps,
            ...eventHandlers, 
            className: META.componentClassName,
        }

        const isAllowChild = !voidElements.has(Tag) && children != null

        const renderData = {
            tag: Tag,
            baseProps,
            isAllowChild,
            children: isAllowChild ? children : null,
        }

        // console.log('styleProps:', styleProps)
        // console.log('triggeredEvents:', triggeredEvents)
        // console.log('triggeredMap:', triggeredMap ? triggeredMap : 'non')
        // console.log('META:', META)
        // console.log('styleProps:', styleProps)
        // console.log('countMap:', countMap)
        // console.log('triggeredEvents:', triggeredEvents)
        // console.log('handleDynamicEvents:', handleDynamicEvents)
        // console.log('eventHandlers:', eventHandlers)

        return renderData
    }
}

export default generateRenderData_v3
