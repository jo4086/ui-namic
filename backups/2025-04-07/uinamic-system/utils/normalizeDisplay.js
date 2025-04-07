// @uinamic-system/normalizeDisplay.js

import { tableTagSet, displayValueSet } from './constants'
import { tableDisplayMap, displayGroupMap } from './constants' // import: Map

/**
 * @constant {Object} tableDisplayMap
 * - Key-value map of HTML table elements to their default CSS display properties.
 * - e.g., 'thead' → 'table-header-group'
 *
 * @constant {Object} displayGroupMap
 * - Categorized mapping of CSS display values.
 * - e.g., 'flex' → ['flex', 'inline-flex']
 */

/**
 * @function normalizeDisplay
 * - Validates the given display value for the specified tag type and determines its display group.
 * - If the type is a table-related tag, uses a predefined display mapping instead of the provided value.
 *
 * @param {string} type
 * - The HTML tag or element type.
 *
 * @param {string} display
 * - The CSS display value to validate and categorize.
 *
 * @returns {{ displayGroup: string, patchDisplay: string }}
 * - An object containing the display group and the validated display value.
 */

function normalizeDisplay(type, display) {
    const patchDisplay = tableTagSet.has(type) ? tableDisplayMap[type] : display

    validDisplay(patchDisplay, type)

    return { displayGroup: getDisplayGroup(patchDisplay), patchDisplay }
}

export default normalizeDisplay

/**
 * @function validDisplay
 * - Validates whether a given display value is valid for the specified type.
 *
 * @param {string} display
 * - The CSS display value to validate.
 *
 * @param {string} type
 * - The HTML tag or element type.
 *
 * @throws {Error}
 * - If the display value is invalid.
 */

const validDisplay = (display, type) => {
    if (!displayValueSet.has(display)) {
        throw new Error(`Invalid display value "${display}" for type "${type}". Allowed values: ${[...displayValueSet].join(', ')}`)
    }
}

/**
 * @function getDisplayGroup
 * - Determines the group of a given CSS display value.
 *
 * @param {string} display
 * - The CSS display value to categorize.
 *
 * @returns {string}
 * - The group name that includes the display value, or 'common' if none match.
 */

const getDisplayGroup = (display) => {
    for (const group in displayGroupMap) {
        if (displayGroupMap[group].includes(display)) return group
    }
    return 'base' // 기본값
}
