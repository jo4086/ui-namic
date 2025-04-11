import { functionalPseudoSet, pseudoElementSet, pseudoClassSet, interactivePseudoElementSet } from './constants'

export function validateTriggerPseudo(name) {
    if (pseudoClassSet.has(name)) return true
    if (pseudoElementSet.has(name)) return true
    throw new Error(`[validateTriggerPseudo] Unknown pseudo: ${name}`)
}

/**
 * 체인형 (복합) pseudo selector 전체 검증
 * 예: ':hover:not(.disabled)::after'
 */
export function validatePseudoSelectorChain(selector) {
    const parts = selector.split(/(?=::?)/g) // :, :: 기준으로 split (구분자 유지)

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i]
        const name = part.replace(/^:+/, '')
        const parenIndex = name.indexOf('(')

        if (parenIndex >= 0) {
            const funcName = name.slice(0, parenIndex)
            if (!functionalPseudoSet.has(funcName)) {
                throw new Error(`[validatePseudoSelector] Invalid functional pseudo: ${funcName}`)
            }
        } else {
            const isPseudoClass = pseudoClassSet.has(name)
            const isPseudoElement = pseudoElementSet.has(name)

            if (!isPseudoClass && !isPseudoElement) {
                throw new Error(`[validatePseudoSelector] Unknown pseudo: ${name}`)
            }

            // ❗ 가상요소는 마지막이어야 함 (단, 상호작용 가능한 경우 제외)
            const isLast = i === parts.length - 1
            if (isPseudoElement && !isLast && !interactivePseudoElementSet.has(name)) {
                throw new Error(`[validatePseudoSelector] Pseudo-element must be last: ${name}`)
            }
        }
    }

    return true
}
