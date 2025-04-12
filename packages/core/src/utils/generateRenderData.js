// @uinamic-system/generateRenderData.js

import { santizeStyle, normalizeStyle } from '../utils'
import useDynamicTrigger from '../hooks/useDynamicTrigger'
import { logStyle } from '@debug'
import { generateMetadata } from './generateMetadata'
import normalizeBaseStyle from './normalizeBaseStyle'
import normalizeDom from './normalizeDOM'

// HTML5 void 요소들 (children 허용 X)
const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])

const generateRenderData = ({ type: defaultType = 'div', display: defaultDisplay = 'block', dynamicType: defaultDynamicType = undefined, baseStyle: defaultBaseStyle = {} } = {}) => {
    return function GeneratedComponent({ children, type, display, dynamicType, dynamicStyle = {}, style, className, dynamic, media, keyframes, pseudo, ...restProps }) {
        const displayPriority = [defaultDisplay, display, dynamicStyle?.display, style?.display]

        const resolvedType = type || defaultType
        const resolvedDisplay = [...displayPriority].reverse().find((v) => v !== undefined)

        const mergedStyle = {
            ...defaultBaseStyle,
            ...dynamicStyle,
            ...(keyframes && { keyframes }),
            ...(media && { media }),
            ...(pseudo && { pseudo }),
            ...(dynamic && { dynamic }),
            ...style,
        }

        const resolvedDynamicType = dynamicType || defaultDynamicType
        const styleProps = santizeStyle({
            type: resolvedType,
            display: resolvedDisplay,
            dynamicStyle: mergedStyle,
        })

        const { isTriggered, handleDynamicEvent } = useDynamicTrigger({ dynamicType, onEvent: restProps[dynamicType] || null })
        
        const META = generateMetadata(styleProps, type, {
            isTriggered,
            userClassName: className,
        })

        normalizeDom(styleProps, META)
        normalizeStyle(styleProps, META)

        const Tag = resolvedType
        const baseProps = {
            ...restProps,
            className: META.componentClassName,
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
