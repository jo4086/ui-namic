// @uinamic-system/generateRenderData_v3.js

import { santizeStyle, normalizeStyle, santizeStyle_v2 } from '../utils'
import useDynamicTrigger from '../hooks/useDynamicTrigger'
import useDynamicTrigger_v2 from '../hooks/useDynamicTrigger_v2'
import useDynamicTrigger_v3 from '../hooks/useDynamicTrigger_v3'

import normalizeBaseStyle from './normalizeBaseStyle'
import normalizeDom from './normalizeDOM'
import { dxEventToDomEventMap, dyPropToDomEventMap, normalizeDyKeyToEventKey, styleTriggerDyEventSet } from './constants'
import { forEachObject, reMapKeys } from './shared'
import normalizeStyle_v2 from './normalizeStyle_v2'

import { generateMetadata } from './generateMetadata'
import generateMetadata_v2 from './generateMetadata_v2'

import { logStyle, isRenderableChildren, isChildPropsEvent } from '@debug'
import { validateHtmlTag } from './validateProxy'
// import validateHtmlTag from './validators/validateHtmlTag'

// HTML5 void 요소들 (children 허용 X)
const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])

const generateRenderData_v3 = ({ itemName, type: defaultType = 'div', display: defaultDisplay = 'block', dynamicType: defaultDynamicType = undefined, baseStyle: defaultBaseStyle = {} } = {}) => {
    return function GeneratedComponent({ children, type, display, dynamicType, dynamicStyle = {}, style, className, media, keyframes, dyOrder = [], dyState, watchValueMap, ...restProps }) {
        const newds = reMapKeys(dynamicStyle, dyPropToDomEventMap)
        console.log(children)

        /**
         * @type {debug}
         */
        // if (typeof restProps.onClick === 'function') {
        //     const originalCode = restProps.onClick.toString()
        //     // console.log('📦 onClick 원형:', originalCode)
        //     console.log('📦 onClick 실제:', restProps.onClick)
        // }

        // 1. rest 정제
        // rest.(dyClick, dyFocus) => onClick, onFocus... 로 변경후 rest에서 제거
        forEachObject(restProps, (k, v) => {
            const dxKey = dyPropToDomEventMap[k]
            if (dxKey) {
                newds[dxKey] = v
                delete restProps[k]
            }
        })

        // 디스플레이 병합
        // const displayPriority = [defaultDisplay, display, dynamicStyle?.display, style?.display]
        const displayPriority = [defaultDisplay, display, newds?.display, style?.display]
        const resolvedDisplay = [...displayPriority].reverse().find((v) => v !== undefined)

        // tag 병합
        const resolvedType = type || defaultType
        validateHtmlTag(resolvedType)

        // style 병합
        const mergedStyle = {
            ...defaultBaseStyle,
            ...newds,
            ...(keyframes && { keyframes }),
            ...(media && { media }),
            ...style,
        }

        const resolvedDynamicType = dynamicType || defaultDynamicType

        // santizeStyle을 통해 tag, display, 병합스타일의 검증
        // 검증내용: display가 tag에 올바르게 적용된 상태인가?
        // 병합한 스타일 객체는
        // 1. 올바른 css속성 및 올바른 특수키를 가지고 있는가?
        // 2. transition의 키경우 평탄화 작업
        const { styleProps, triggeredEvents } = santizeStyle_v2({
            type: resolvedType,
            display: resolvedDisplay,
            mergedStyle,
        })

        const { handleDynamicEvents, triggeredMap, countMap } = useDynamicTrigger_v3({
            triggeredEvents: ['click'],
            restProps,
            dyState,
            watchValueMap, // 👈 외부 상태 연결
        })

        const META = generateMetadata_v2(styleProps, resolvedType, {
            userClassName: className,
            triggeredMap, // ✅ 실제 상태 (onClick: true 등)
            triggeredEvents: triggeredEvents.map((evt) => dxEventToDomEventMap[evt]),
        })

        normalizeDom(styleProps, META)
        normalizeStyle(styleProps, META)
        normalizeStyle_v2(styleProps, META)

        const Tag = resolvedType

        const eventHandlers = Object.fromEntries(
            triggeredEvents.map((evt) => [
                dxEventToDomEventMap[evt], // ex: 'onClick'
                handleDynamicEvents[dxEventToDomEventMap[evt]],
            ])
        )

        const baseProps = {
            ...restProps,
            ...eventHandlers, // ✅ 모든 이벤트 핸들러 바인딩
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
