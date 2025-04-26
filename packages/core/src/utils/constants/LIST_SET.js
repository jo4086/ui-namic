// @uinamic-system/utils/constants/list-set.js

/**
 * 🔹 EXPORT STRUCTURE
 * export const ${name} = { list, set }
 *
 * Includes:
 * - tableTag
 * - displayValue
 * - pseudoClass
 * - pseudoElement
 * - allPseudo
 * - onEventAll
 *
 * - baseProperty
 * - flexProperty
 * - gridProperty
 * - tableProperty
 *
 * - mergedBaseProperty
 * - mergedFlexProperty
 * - mergedGridProperty
 * - mergedTableProperty
 *
 * 🔹 DEFAULT EXPORT
 * export default propsMap = { all above }
 */

// 1. 태그 관련
export const tableTagList = ['table', 'caption', 'thead', 'tfoot', 'tbody', 'colgroup', 'tr', 'td', 'th', 'col']
export const tableTagSet = new Set(tableTagList)

// 2. display 관련

// 3. 가상 선택자 관련
export const pseudoClassList = [
    'active',
    'focus',
    'hover',
    'focus-visible',
    'focus-within',
    'target',
    'link',
    'visited',
    'any-link',
    'checked',
    'indeterminate',
    'disabled',
    'enabled',
    'default',
    'in-range',
    'out-of-range',
    'invalid',
    'valid',
    'optional',
    'required',
    'read-only',
    'read-write',
    'placeholder-shown',
    'empty',
    'first-child',
    'last-child',
    'only-child',
    'first-of-type',
    'last-of-type',
    'only-of-type',
    'nth-child',
    'nth-last-child',
    'nth-of-type',
    'nth-last-of-type',
    'root',
    'scope',
    'not',
    'is',
    'where',
    'lang',
]
export const pseudoClassSet = new Set(pseudoClassList)

export const pseudoElementList = ['first-letter', 'first-line', 'selection', 'before', 'after', 'placeholder', 'marker', '-webkit-scrollbar']
export const pseudoElementSet = new Set(pseudoElementList)

export const allPseudoList = [...pseudoClassList, ...pseudoElementList]
export const allPseudoSet = new Set(allPseudoList)

export const functionalPseudoList = ['not', 'nth-child', 'nth-of-type', 'nth-last-child']
export const functionalPseudoSet = new Set(functionalPseudoList)

// 4. 스타일 속성 그룹 (base → flex/grid/table 로 확장)
const paddingList = ['padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']
const paddingAbbrList = ['pd', 'pt', 'pr', 'pb', 'pl', 'py', 'px']
const marginList = ['margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft']
const marginAbbrList = ['mg', 'mt', 'mr', 'mb', 'ml', 'my', 'mx']
const borderList = ['border', 'borderTop', 'borderBottom', 'borderRight', 'borderLeft', 'borderRadius', 'outline']
const borderAbbrList = ['bd', 'bt', 'br', 'bb', 'bl', 'by', 'bx']
const colorList = ['color', 'backgroundColor', 'caretColor']
const layoutList = ['width', 'height', 'maxWidth', 'minWidth', 'maxHeight', 'minHeight', 'aspectRatio', 'boxSizing', 'position', 'top', 'right', 'bottom', 'left', 'zIndex']
const typographyList = ['fontSize', 'fontWeight', 'fontFamily', 'textAlign', 'lineHeight', 'letterSpacing', 'textDecoration', 'whiteSpace', 'quotes', 'content']
const effectList = ['boxShadow', 'opacity', 'transform', 'willChange']
const transitionList = ['transition', 'trnasititon-property', 'transition-duration', 'transition-timing-function', 'transition-delay', 'transition-behavior']
const animationList = ['animation', 'animationName', 'animationDuration', 'animationTimingFunction', 'animationDelay', 'animationIterationCount', 'animationDirection', 'animationFillMode', 'animationPlayState']
const interactivityList = ['cursor', 'pointerEvents', 'userSelect', 'tabIndex']
const mediaList = ['objectFit', 'resize']
const listPropertyList = ['listStyle', 'listStyleType', 'listStyleImage', 'listStylePosition', 'counterReset', 'counterIncrement']
const miscList = ['whiteSpace', 'all']
const customCssList = ['easing']
const flexItems = ['order', 'flex', 'flexGrow', 'flexShrink', 'flexBasis', 'alignSelf', 'justifySelf']
const gridItems = ['gridRowStart', 'gridRowEnd', 'gridRow', 'gridColumnStart', 'gridColumnEnd', 'gridColumn', 'gridArea', 'alignSelf', 'justifySelf', 'placeSelf', 'order', 'zIndex']

export const basePropertyList = [
    ...paddingList,
    ...paddingAbbrList,
    ...marginList,
    ...marginAbbrList,
    ...borderList,
    ...borderAbbrList,
    ...colorList,
    ...layoutList,
    ...typographyList,
    ...effectList,
    ...transitionList,
    ...animationList,
    ...interactivityList,
    ...mediaList,
    ...listPropertyList,
    ...miscList,
    ...customCssList,
    ...flexItems,
    ...gridItems,
]
export const basePropertySet = new Set(basePropertyList)

export const flexPropertyList = ['display', 'flexFlow', 'flexDirection', 'flexWrap', 'justifyContent', 'alignContent', 'alignItems', 'alignSelf', 'justifySelf', 'placeItems', 'placeContent', 'placeSelf', 'gap']
export const flexPropertySet = new Set(flexPropertyList)

export const gridPropertyList = [
    'display',
    'gridTemplateColumns',
    'gridTemplateRows',
    'gridGap',
    'alignItems',
    'justifyContent',
    'justifyItems',
    'placeItems',
    'placeContent',
    'gridTemplateRows',
    'gridTemplateColumns',
    'gridTemplateAreas',
    'gridTemplate',
    'rowGap',
    'columnGap',
    'gap',
    'gridAutoRows',
    'gridAutoColumns',
    'gridAutoFlow',
]
export const gridPropertySet = new Set(gridPropertyList)

export const tablePropertyList = ['colspan', 'rowspan', 'cellSpacing', 'cellPadding', 'borderCollapse', 'captionSide', 'emptyCells', 'tableLayout']
export const tablePropertySet = new Set(tablePropertyList)

export const mergedBaseProperty = {
    list: [...basePropertyList],
    set: new Set([...basePropertyList]),
}
export const mergedFlexProperty = {
    list: [...basePropertyList, ...flexPropertyList],
    set: new Set([...basePropertyList, ...flexPropertyList]),
}
export const mergedGridProperty = {
    list: [...basePropertyList, ...gridPropertyList],
    set: new Set([...basePropertyList, ...gridPropertyList]),
}
export const mergedTableProperty = {
    list: [...basePropertyList, ...tablePropertyList],
    set: new Set([...basePropertyList, ...tablePropertyList]),
}

// 5. 이벤트 관련
const mouseEvent = ['onClick', 'onDoubleClick', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onContextMenu']
const keyboardEvent = ['onKeyDown', 'onKeyPress', 'onKeyUp']
const focusEvent = ['onFocus', 'onBlur', 'onFocusIn', 'onFocusOut']
const formEvent = ['onChange', 'onInput', 'onInvalid', 'onSubmit', 'onReset']
const touchEvent = ['onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart']
const dragEvent = ['onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop']
const otherEvent = ['onWheel', 'onSelect', 'onCopy', 'onCut', 'onPaste', 'onLoad', 'onError', 'onPointerDown', 'onPointerMove', 'onPointerUp', 'onPointerCancel', 'onPointerEnter', 'onPointerLeave', 'onPointerOver', 'onPointerOut', 'onGotPointerCapture', 'onLostPointerCapture']
const mediaEvent = [
    'onAbort',
    'onCanPlay',
    'onCanPlayThrough',
    'onDurationChange',
    'onEmptied',
    'onEncrypted',
    'onEnded',
    'onLoadedData',
    'onLoadedMetadata',
    'onLoadStart',
    'onPause',
    'onPlay',
    'onPlaying',
    'onProgress',
    'onRateChange',
    'onSeeked',
    'onSeeking',
    'onStalled',
    'onSuspend',
    'onTimeUpdate',
    'onVolumeChange',
    'onWaiting',
]
const animationEvent = ['onAnimationStart', 'onAnimationEnd', 'onAnimationIteration', 'onTransitionEnd']
const uiEvent = ['onScroll', 'onResize', 'onToggle']
const compositionEvnet = ['onCompositionStart', 'onCompositionUpdate', 'onCompositionEnd']

export const onEventAllList = [...mouseEvent, ...keyboardEvent, ...focusEvent, ...formEvent, ...touchEvent, ...dragEvent, ...otherEvent, ...mediaEvent, ...animationEvent, ...uiEvent, ...compositionEvnet]
export const onEventAllSet = new Set(onEventAllList)

export const styleTriggerEventList = ['click', 'mouseEnter', 'mouseLeave', 'focus', 'blur', 'keyDown', 'touchStart', 'pointerDown']
export const styleTriggerEventSet = new Set(styleTriggerEventList)
export const styleTriggerEvent = { list: styleTriggerEventList, set: styleTriggerEventSet }

export const styleTriggerOnEventList = ['onClick', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur', 'onKeyDown', 'onTouchStart', 'onPointerDown']
export const styleTriggerOnEventSet = new Set(styleTriggerOnEventList)
export const styleTriggerOnEvent = { list: styleTriggerOnEventList, set: styleTriggerOnEventSet }

export const styleTriggerDyEventList = ['dyClick', 'dyMouseEnter', 'dyMouseLeave', 'dyFocus', 'dyBlur', 'dyKeyDown', 'dyTouchStart', 'dyPointerDown']
export const styleTriggerDyEventSet = new Set(styleTriggerDyEventList)
export const styleTriggerDyEvent = { list: styleTriggerDyEventList, set: styleTriggerDyEventSet }

// 6. 가상 요소 속성 및 브라우저 확장
export const pseudoPropertyList = ['content']
export const pseudoPropertySet = new Set(['content'])
export const pseudoProperty = { list: pseudoPropertyList, set: pseudoPropertySet }

export const pseudoElementContentList = ['after', 'before', 'marker']
export const pseudoElementContentSet = new Set(pseudoElementContentList)
export const pseudoElementContent = { list: pseudoElementContentList, set: pseudoElementContentSet }

export const pseudoElementBrowserList = ['-webkit-scrollbar', '-webkit-scrollbar-track', '-webkit-scrollbar-thumb', '-webkit-scrollbar-corner', '-webkit-scrollbar-button', '-webkit-scrollbar-track-piece']
export const pseudoElementBrowserSet = new Set(pseudoElementBrowserList)
export const pseudoElementBrowser = { list: pseudoElementBrowserList, set: pseudoElementBrowserSet }

export const interactivePseudoElementList = ['-webkit-scrollbar-thumb']
export const interactivePseudoElementSet = new Set(interactivePseudoElementList)
export const interactivePseudoElement = { list: interactivePseudoElementList, set: interactivePseudoElementSet }

export const pseudoBrowserPropertyList = ['scrollbar-width', 'scrollbar-color', 'scrollbar-highlight-color', 'scrollbar-face-color', 'scrollbar-track-color', 'scrollbar-arrow-color', 'scrollbar-shadow-color', 'scrollbar-3dlight-color', 'scrollbar-darkshadow-color']
export const pseudoBrowserPropertySet = new Set(pseudoBrowserPropertyList)
export const pseudoBrowserProperty = { list: pseudoBrowserPropertyList, set: pseudoBrowserPropertySet }

// 7. 그룹화 및 기본 export
export const tableTag = { list: tableTagList, set: tableTagSet }
export const pseudoClass = { list: pseudoClassList, set: pseudoClassSet }
export const pseudoElement = { list: pseudoElementList, set: pseudoElementSet }
export const allPseudo = { list: allPseudoList, set: allPseudoSet }
export const functionalPseudo = { list: functionalPseudoList, set: functionalPseudoSet }
export const onEventAll = { list: onEventAllList, set: onEventAllSet }
export const baseProperty = { list: basePropertyList, set: basePropertySet }
export const flexProperty = { list: flexPropertyList, set: flexPropertySet }
export const gridProperty = { list: gridPropertyList, set: gridPropertySet }
export const tableProperty = { list: tablePropertyList, set: tablePropertySet }

const propsMap = {
    tableTag,
    pseudoClass,
    pseudoElement,
    functionalPseudo,
    allPseudo,
    onEventAll,
    baseProperty,
    flexProperty,
    gridProperty,
    tableProperty,
    mergedBaseProperty,
    mergedFlexProperty,
    mergedGridProperty,
    mergedTableProperty,
}
export default propsMap

export const styleGroupMap = {
    padding: paddingList,
    paddingAbbr: paddingAbbrList,
    margin: marginList,
    marginAbbr: marginAbbrList,
    border: borderList,
    borderAbbr: borderAbbrList,
    layout: layoutList,
    effect: effectList,
    typography: typographyList,
    color: colorList,
    interactivity: interactivityList,
    media: mediaList,
    misc: miscList,
    flexItem: flexItems,
    gridItem: gridItems,
    list: listPropertyList,
}
