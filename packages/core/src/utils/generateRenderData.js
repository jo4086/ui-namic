// @uinamic-system/generateRenderData.js

import { santizeStyle, normalizeStyle } from '../utils'
import useDynamicTrigger from '../hooks/useDynamicTrigger'
import { logStyle } from '@debug'
import { generateObjectId } from './generateObjectId'

// HTML5 void 요소들 (children 허용 X)
const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])

const generateRenderData = ({ type: defaultType = 'div', display: defaultDisplay = 'block', dynamicType: defaultDynamicType = undefined, baseStyle: defaultBaseStyle = {} } = {}) => {
    return function GeneratedComponent({ children, type, display, dynamicType, dynamicStyle = {}, style, className, ...restProps }) {
        const displayPriority = [defaultDisplay, display, dynamicStyle?.display, style?.display]

        const tagToClassPrefix = {
            button: 'Button',
            div: 'Box',
            input: 'InputField',
        }

        const resolvedType = type || defaultType
        const resolvedDisplay = [...displayPriority].reverse().find((v) => v !== undefined)
        const mergedStyle = { ...defaultBaseStyle, ...dynamicStyle, ...style }
        const resolvedDynamicType = dynamicType || defaultDynamicType
        const styleProps = santizeStyle({
            type: resolvedType,
            display: resolvedDisplay,
            dynamicStyle: mergedStyle,
        })

        const { isTriggered, handleDynamicEvent } = useDynamicTrigger({ dynamicType, onEvent: restProps[dynamicType] || null })

        const typeName = tagToClassPrefix[resolvedType] || 'Element'
        const uniqueId = generateObjectId(styleProps)
        const baseClassName = `UINAMIC_${typeName}_${uniqueId}`

        const componentClassName = `${baseClassName}${isTriggered ? ' --UINAMIC--dynamic' : ''}`.trim()

        normalizeStyle(styleProps, baseClassName)
        // console.log('styleProps:', styleProps)

        const Tag = resolvedType
        const baseProps = {
            ...restProps,
            className: componentClassName,
            // style: styleProps,
            ...(resolvedDynamicType ? { [resolvedDynamicType]: handleDynamicEvent } : {}),
        }

        // console.log('style\n', style)
        // console.log('restProps.style:', restProps.style)
        // console.log('uniqueId:', uniqueId)
        // console.log('baseProps:', baseProps)

        const isAllowChild = !voidElements.has(Tag) && children != null

        const renderData = {
            tag: Tag,
            baseProps,
            isAllowChild,
            children: isAllowChild ? children : null,
        }
        // console.groupEnd()

        return renderData
    }
}

export default generateRenderData
