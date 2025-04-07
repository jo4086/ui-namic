// @uinamic-system/generateRenderData.js

import { santizeStyle, normalizeStyle } from '../utils'
import useDynamicTrigger from '../hooks/useDynamicTrigger'
// import { logStyle } from '@debug'
import { logStyle } from '@uinamic/debug'

// HTML5 void 요소들 (children 허용 X)
const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])

const generateRenderData = ({ type: defaultType = 'div', display: defaultDisplay = 'block', dynamicType: defaultDynamicType = undefined, baseStyle: defaultBaseStyle = {} } = {}) => {
    return function GeneratedComponent({ children, type, display, dynamicType, dynamicStyle = {}, ...restProps }) {
        const resolvedType = type || defaultType
        const resolvedDisplay = display || defaultDisplay
        const resolvedDynamicType = dynamicType || defaultDynamicType
        const mergedStyle = { ...defaultBaseStyle, ...restProps.style, ...dynamicStyle }

        // console.log('%crestProps', 'font-size:2rem;', restProps)

        // console.log('%ctype', 'font-size:3rem;', type)
        // console.log('%cdefaultType', 'font-size:3rem;', defaultType)
        // console.log('%cdisplay', 'font-size:3rem;', display)
        // console.log('%cdefaultDisplay', 'font-size:3rem;', defaultDisplay)

        // console.log('%cresolvedType', 'font-size:3rem;', resolvedType)
        // console.log('%cresolvedDisplay', 'font-size:3rem;', resolvedDisplay)
        // console.log('%cresolvedDynamicType', 'font-size:3rem;', resolvedDynamicType)

        // console.log('%cdynamicStyle:', 'color:orange; font-size:1.3rem', dynamicStyle)
        // console.log('%cchildren', 'color:orange; font-size:1.3rem', children)
        // console.log('%ctype', 'color:orange; font-size:1.3rem', type)
        // console.log('%cdisplay', 'color:orange; font-size:1.3rem', display)
        // console.log('%cdynamicType', 'color:orange; font-size:1.3rem', dynamicType)
        // console.log('%crestProps', 'color:orange; font-size:1.3rem', restProps)

        // console.log('%c ⛏ Component 실행됨', 'color:orange')

        // console.log('%c🎯 mergedStyle:', 'color:orange; font-size:1.3rem')
        logStyle('mergedStyle', { mergedStyle, children }, 'purple400')
        // console.groupCollapsed('%c🎯 mergedStyle', 'background-color:orange; font-size:2rem; padding:5px 10px 5px 3px')
        // console.log(mergedStyle)
        // console.groupEnd()

        const { style, other, className, dynamicTrigger, patchDisplay } = santizeStyle({
            type: resolvedType,
            display: resolvedDisplay,
            dynamicType: resolvedDynamicType,
            props: restProps,
            dynamicStyle: mergedStyle,
        })
        // console.log('other:', other)

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
        console.groupEnd()

        return renderData
    }
}

export default generateRenderData
