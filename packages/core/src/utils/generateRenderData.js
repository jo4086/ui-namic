// @uinamic-system/generateRenderData.js

import { santizeStyle, normalizeStyle } from '../utils'
import useDynamicTrigger from '../hooks/useDynamicTrigger'
import { getOrCreateStyle } from '../utils/styleHash' // 👈 추가
import { logStyle } from '@debug'

// HTML5 void 요소들 (children 허용 X)
const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])

const generateRenderData = ({ type: defaultType = 'div', display: defaultDisplay = 'block', dynamicType: defaultDynamicType = undefined, baseStyle: defaultBaseStyle = {} } = {}) => {
    return function GeneratedComponent({ children, type, display, dynamicType, dynamicStyle = {}, ...restProps }) {
        const resolvedType = type || defaultType
        const resolvedDisplay = display || defaultDisplay
        const resolvedDynamicType = dynamicType || defaultDynamicType
        const mergedStyle = { ...defaultBaseStyle, ...restProps, ...dynamicStyle, ...restProps.style }

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
        const Tag = resolvedType
        const baseProps = {
            className: `${className || ''} ${isTriggered ? 'dynamic' : ''}`.trim(),
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
