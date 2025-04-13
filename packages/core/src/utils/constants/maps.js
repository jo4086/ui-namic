// @uinamic-system/utils/constants/maps.js

/** INDEX
 * -- naming role `${name}Map` --
 * displayGroup
 * tableDisplay
 * displayList
 * displaySet
 */

import propsMap from './list-set'

export const displayGroupMap = {
    base: ['block', 'inline', 'inline-block', 'flow-root', 'list-item'],
    flex: ['flex', 'inline-flex'],
    grid: ['grid', 'inline-grid'],
    table: ['table', 'inline-table', 'table-row-group', 'table-header-group', 'table-footer-group', 'table-row', 'table-cell', 'table-column', 'table-column-group', 'table-caption'],
}

export const displayListMap = {
    base: propsMap.baseProperty.list,
    flex: propsMap.flexProperty.list,
    grid: propsMap.gridProperty.list,
    table: propsMap.tableProperty.list,
}

export const displaySetMap = {
    base: propsMap.mergedBaseProperty.set,
    flex: propsMap.mergedFlexProperty.set,
    grid: propsMap.mergedGridProperty.set,
    table: propsMap.mergedTableProperty.set,
}

export const tableDisplayMap = {
    table: 'table',
    caption: 'table-caption',
    thead: 'table-header-group',
    tfoot: 'table-footer-group',
    tbody: 'table-row-group',
    colgroup: 'table-column-group',
    tr: 'table-row',
    td: 'table-cell',
    th: 'table-cell',
    col: 'table-column',
}

export const paddingAbbrMap = {
    pd: ['padding'],
    pr: ['paddingRight'],
    pl: ['paddingLeft'],
    pt: ['paddingTop'],
    pb: ['paddingBottom'],
    py: ['paddingTop', 'paddingBottom'],
    px: ['paddingLeft', 'paddingRight'],
}

export const marginAbbrMap = {
    mg: ['margin'],
    mt: ['marginTop'],
    mr: ['marginRight'],
    mb: ['marginBottom'],
    ml: ['marginLeft'],
    my: ['marginTop', 'marginBottom'],
    mx: ['marginRight', 'marginLeft'],
}

export const borderAbbrMap = {
    bd: ['border'],
    bt: ['borderTop'],
    br: ['borderRight'],
    bb: ['borderBottom'],
    bl: ['borderLeft'],
    by: ['borderTop', 'borderBottom'],
    bx: ['borderLeft', 'borderRight'],
}

// 축약형 이벤트 키 → React DOM 이벤트 키
// ex) click → onClick
export const dxEventToDomEventMap = {
    click: 'onClick',
    mouseEnter: 'onMouseEnter',
    mouseLeave: 'onMouseLeave',
    focus: 'onFocus',
    blur: 'onBlur',
    keyDown: 'onKeyDown',
    touchStart: 'onTouchStart',
    pointerDown: 'onPointerDown',
}

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// dy 프롭스 키 → React DOM 이벤트 키
// ex) dyClick → onClick
export const dyPropToDomEventMap = Object.fromEntries(Object.keys(dxEventToDomEventMap).map((key) => [`dy${capitalize(key)}`, dxEventToDomEventMap[key]]))

// dy 프롭스 키 → 축약형 이벤트 키
// ex) dyClick → click
export const dyPropToEventMap = Object.fromEntries(Object.keys(dxEventToDomEventMap).map((key) => [`dy${capitalize(key)}`, key]))

// React DOM 이벤트 키 → 축약형 이벤트 키
// ex) onClick → click
export const domEventToDxEventMap = Object.fromEntries(Object.entries(dxEventToDomEventMap).map(([k, v]) => [v, k]))

export const normalizeDyKeyToEventKey = (dyKey) => dyPropToEventMap[dyKey] || null

const maps = {
    displayGroupMap,
    displayListMap,
    displaySetMap,
    tableDisplayMap,
    paddingAbbrMap,
    marginAbbrMap,
    borderAbbrMap,
}

export default maps
