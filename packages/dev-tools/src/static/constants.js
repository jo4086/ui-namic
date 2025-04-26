export const validHtmlTagSet = new Set([
    // 일반 구조
    'div',
    'span',
    'p',
    'a',
    'img',
    'button',
    'input',
    'textarea',
    'label',

    // 시맨틱 구조
    'section',
    'article',
    'header',
    'footer',
    'main',
    'nav',
    'aside',

    // 텍스트/타이포
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'strong',
    'em',
    'small',
    'blockquote',

    // 목록
    'ul',
    'ol',
    'li',
    'dl',
    'dt',
    'dd',

    // 테이블
    'table',
    'thead',
    'tbody',
    'tfoot',
    'tr',
    'td',
    'th',
    'caption',
    'colgroup',
    'col',

    // 폼 요소
    'form',
    'fieldset',
    'legend',
    'select',
    'option',
    'optgroup',

    // 미디어
    'video',
    'audio',
    'source',
    'canvas',
    'svg',
    'picture',

    // 기타
    'iframe',
    'br',
    'hr',
    'details',
    'summary',
    'code',
    'pre',

    // HTML5 확장
    'dialog',
    'meter',
    'progress',
    'time',
    'mark',

    // 구조 제어용
    'template',
    'script',
    'noscript',
    'style',
    'slot',
])

// const optionKeyList =
const optionKeyList = ['keyframes', 'media']
const styleTriggerOnEventList = ['onClick', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur', 'onKeyDown', 'onTouchStart', 'onPointerDown']
export const specialKeySet = new Set([...optionKeyList, ...styleTriggerOnEventList])

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

const basePropertyList = [
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

    ...styleTriggerOnEventList,
]
const flexPropertyList = ['display', 'flexFlow', 'flexDirection', 'flexWrap', 'justifyContent', 'alignContent', 'alignItems', 'alignSelf', 'justifySelf', 'placeItems', 'placeContent', 'placeSelf', 'gap']
const gridPropertyList = [
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
const tablePropertyList = ['colspan', 'rowspan', 'cellSpacing', 'cellPadding', 'borderCollapse', 'captionSide', 'emptyCells', 'tableLayout']

const mergedBasePropertySet = new Set([...basePropertyList])
const mergedFlexPropertySet = new Set([...basePropertyList, ...flexPropertyList])
const mergedGridPropertySet = new Set([...basePropertyList, ...gridPropertyList])
const mergedTablePropertySet = new Set([...basePropertyList, ...tablePropertyList])

export const displaySetMap = {
    base: mergedBasePropertySet,
    flex: mergedFlexPropertySet,
    grid: mergedGridPropertySet,
    table: mergedTablePropertySet,
}

const displayValueList = [
    'block',
    'inline',
    'inline-block',
    'flow-root',
    'list-item',
    'flex',
    'inline-flex',
    'grid',
    'inline-grid',
    'table',
    'inline-table',
    'table-caption',
    'table-column',
    'table-column-group',
    'table-row-group',
    'table-header-group',
    'table-footer-group',
    'table-row',
    'table-cell',
]
export const displayValueSet = new Set(displayValueList)
