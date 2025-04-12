// @uinamic-system/generateRenderData.js

import { santizeStyle, normalizeStyle } from '../utils'
import useDynamicTrigger from '../hooks/useDynamicTrigger'
import { logStyle } from '@debug'
import { generateMetadata } from './generateMetadata'
import normalizeBaseStyle from './normalizeBaseStyle'
import normalizeDom from './normalizeDOM'
import { styleTriggerDyEventSet } from './constants'
import { forEachObject } from './shared'

// HTML5 void 요소들 (children 허용 X)
const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])

// dx: dynamicStyle(베이스를 포함한 전체 스타일지정) dy: dynamic지정 속성
// dyEvent='onClick' == 다이나믹 연결 속성
// dx={{base, dy: {다이나믹 속성}}}
// key로 pseudo제외,  hover, focus등 직접연결
// dy: {onClick: {온클릭 전용 속성}, {onFocus:{온포커스 전용 속성}}}
// props로 직접 설정 => dyClick, dyFocus, dyBlur,... 직접  연결할 다이나믹
// style태그도 기본적으로 CSS DOM삽입 구조
// inline으로 삽입 원할시 <Box style={{fontSize:'2rem'}} inline />  =>  <div style='font-size:2rem;' />
// 이경우는 .UINAMIC_BOX_UNIQUEid {}는 추가안되고 .UINAMIC_BOX_UNIQUEid.__dynamic {} 만 추가됌

// 여러개의 dy속성을 준다면...
// .UINAMIC_BOX_uniqueID.__onClick {}
// .UINAMIC_BOX_uniqueID.__onFocus {}
// .UINAMIC_BOX_uniqueID.__onBlur {}
//   dyClick="font-size:2rem"
//   dyFocus="font-size:3rem"
//   dyBlur="background-color:yellow"
//   dyOrder={['dyBlur', 'dyClick', 'dyFocus']}

/**
 * @param {string[]} dyOrder - 다중 이벤트 트리거 스타일 정의 시 우선순위를 명시함
 *
 * @example
 * <Box
 *   dyClick="font-size:2rem;color:red;"
 *   dyFocus="font-size:3rem;background-color:blue;"
 *   dyOrder={['onFocus', 'onClick']}
 * />
 *
 * ▶ 결과로 생성되는 스타일:
 * .UINAMIC_BOX_uniqueID.__onClick {
 *   font-size: 2rem;
 *   color: red;
 * }
 * .UINAMIC_BOX_uniqueID.__onFocus {
 *   font-size: 3rem;
 *   background-color: blue;
 * }
 *
 * ▶ 최종 렌더링된 DOM:
 *   1. 모든 이벤트 비활성화상태
 *   <div class="UINAMIC_BOX_uniqueID" />
 *
 *   2. 온클릭 활성상태
 *   <div class="UINAMIC_BOX_uniqueID __onClick" />
 *
 *   3. 온포커스 활성상태
 *   <div class="UINAMIC_BOX_uniqueID __onFocus" />
 *
 *   4. 모든 이벤트 활성상태
 *   <div class="UINAMIC_BOX_uniqueID __onClick __onFocus" />
 *
 * ▶ 스타일 병합 결과:
 * - 공통 속성(font-size)은 dyOrder 기준으로 'onFocus'가 우선 → 3rem
 * - 나머지 충돌 없는 속성은 모두 병합
 *
 * 최종 스타일 적용:
 * {
 *   font-size: 3rem;
 *   color: red;
 *   background-color: blue;
 * }
 */

const generateRenderData = ({ type: defaultType = 'div', display: defaultDisplay = 'block', dynamicType: defaultDynamicType = undefined, baseStyle: defaultBaseStyle = {} } = {}) => {
    return function GeneratedComponent({ children, type, display, dynamicType, dynamicStyle = {}, style, className, dynamic, media, keyframes, pseudo, ...restProps }) {
        const dyStyleMap = {}

        forEachObject(restProps, (key, value) => {
            if (styleTriggerDyEventSet.has(key)) {
                const eventKey = key.replace(/^dy/, 'on')
                dyStyleMap[eventKey] = value
                console.log('트리거 DyEvent key:', key)
                console.log('트리거 DyEvent value:', value)
                delete restProps[key]
            }
        })
        console.log('dyStyleMap:', dyStyleMap)

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
