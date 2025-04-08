// @uinamic-system/generateRenderData.js

import { santizeStyle, normalizeStyle } from '../utils'
import useDynamicTrigger from '../hooks/useDynamicTrigger'
import { getOrCreateStyle } from '../utils/styleHash' // 👈 추가
import { logStyle } from '@debug'
import { generateStyleId } from './generateStyleId'
import { generateObjectId } from './hasher'

// HTML5 void 요소들 (children 허용 X)
const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])

const generateRenderData = ({ type: defaultType = 'div', display: defaultDisplay = 'block', dynamicType: defaultDynamicType = undefined, baseStyle: defaultBaseStyle = {} } = {}) => {
    return function GeneratedComponent({ children, type, display, dynamicType, dynamicStyle = {}, ...restProps }) {
        const displayPriority = [defaultDisplay, display, dynamicStyle?.display, restProps?.style?.display]
        const tagToClassPrefix = {
            button: 'Button',
            div: 'Box',
            input: 'InputField',
        }

        const resolvedType = type || defaultType
        // const typeName = tagToClassPrefix[resolvedType] || 'Element'

        const resolvedDisplay = [...displayPriority].reverse().find((v) => v !== undefined)
        // const resolvedDisplay = display || defaultDisplay || restProps.display || restProps.style.display
        const resolvedDynamicType = dynamicType || defaultDynamicType
        const mergedStyle = { ...defaultBaseStyle, ...restProps, ...dynamicStyle, ...restProps.style }

        console.log('resolvedDisplay:', resolvedDisplay)

        const { style, other, className, dynamicTrigger, patchDisplay } = santizeStyle({
            type: resolvedType,
            display: resolvedDisplay,
            dynamicType: resolvedDynamicType,
            props: restProps,
            dynamicStyle: mergedStyle,
        })

        console.log('style\n', style)

        normalizeStyle(style)

        const { isTriggered, handleDynamicEvent } = useDynamicTrigger(dynamicTrigger)

        const uniqueId = generateObjectId(style)
        const typeName = tagToClassPrefix[resolvedType] || 'Element'
        const componentClassName = `UINAMIC_${typeName}_${uniqueId}${isTriggered ? '_Dynamic' : ''}`

        const Tag = resolvedType
        const baseProps = {
            className: `${className || ''} ${componentClassName}`.trim(),
            ...other,
            style,
            ...(resolvedDynamicType ? { [resolvedDynamicType]: handleDynamicEvent } : {}),
        }

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
