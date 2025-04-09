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
 *
 * 💡 USAGE:
 * import props from 'path'
 *
 * props.baseProperty.list
 * props.mergedGridProperty.set
 * props.onEventAll.list
 */

export const tableTagList = ['table', 'caption', 'thead', 'tfoot', 'tbody', 'colgroup', 'tr', 'td', 'th', 'col']

export const tableTagSet = new Set(tableTagList)

export const displayValueList = [
    'flex',
    'inline-flex',
    'grid',
    'inline-grid',
    'block',
    'inline',
    'inline-block',
    'flow-root',
    'list-item',
    'table',
    'inline-table',
    'table-row-group',
    'table-header-group',
    'table-footer-group',
    'table-row',
    'table-cell',
    'table-column',
    'table-column-group',
    'table-caption',
]

export const displayValueSet = new Set(displayValueList)

export const pseudoClassList = [
    // Dynamic pseudo-classes
    'active',
    'focus',
    'hover',
    'focus-visible',
    'focus-within',
    'target',

    // Link-related
    'link',
    'visited',
    'any-link',

    // Form/UI state
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

    // Structural
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

    // Logical/selector
    'not',
    'is',
    'where',

    // Language/direction
    'lang',
]

export const pseudoClassSet = new Set(pseudoClassList)

export const pseudoElementList = [
    // Text styling pseudo-elements
    'first-letter',
    'first-line',
    'selection',

    // Generated content pseudo-elements
    'before',
    'after',

    // Commonly supported experimental (조건부)
    'placeholder',

    'marker',
    // Browser
    '-webkit-scrollbar',
]

export const pseudoElementSet = new Set(pseudoElementList)

export const allPseudoList = [...pseudoClassList, ...pseudoElementList]

export const allPseudoSet = new Set(allPseudoList)

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
    // 속성
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

const pseudoPropertyList = ['content']
const pseudoElementContent = ['after, before, marker']
const pseudoElementBrowser = ['-webkit-scrollbar']
const pseudoBrowserPropertyList = ['scrollbar-width', 'scrollbar-color', 'scrollbar-highlight-color', 'scrollbar-face-color', 'scrollbar-track-color', 'scrollbar-arrow-color', 'scrollbar-shadow-color', 'scrollbar-3dlight-color', 'scrollbar-darkshadow-color']

export const tableTag = {
    list: tableTagList,
    set: tableTagSet,
}

export const displayValue = {
    list: displayValueList,
    set: displayValueSet,
}

export const pseudoClass = {
    list: pseudoClassList,
    set: pseudoClassSet,
}

export const pseudoElement = {
    list: pseudoElementList,
    set: pseudoElementSet,
}

export const allPseudo = {
    list: allPseudoList,
    set: allPseudoSet,
}

export const onEventAll = {
    list: onEventAllList,
    set: onEventAllSet,
}

export const baseProperty = {
    list: basePropertyList,
    set: basePropertySet,
}

export const flexProperty = {
    list: flexPropertyList,
    set: flexPropertySet,
}

export const gridProperty = {
    list: gridPropertyList,
    set: gridPropertySet,
}

export const tableProperty = {
    list: tablePropertyList,
    set: tablePropertySet,
}

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

const propsMap = {
    tableTag,
    displayValue,

    pseudoClass,
    pseudoElement,

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
