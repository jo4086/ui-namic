import { handleError } from '../shared/handleError'
import { suggestSmartTag } from './suggestSmartTag'
import { suggestSmartTag_v2 } from './suggestSmartTag_v2'

const validHtmlTagSet = new Set([
    'div',
    'span',
    'section',
    'article',
    'header',
    'footer',
    'main',
    'nav',
    'aside',
    'input',
    'button',
    'form',
    'label',
    'a',
    'ul',
    'li',
    'table',
    'thead',
    'tbody',
    'tr',
    'td',
    'th',
    // 필요한 경우 더 추가
])

export function validateHtmlTag(tag) {
    if (!validHtmlTagSet.has(tag)) {
        // handleError(`⚠️ Invalid HTML tag: <${tag}>`, {
        handleError(
            `Invalid HTML tag: <${tag}>`,
            {
                suggestion: suggestSmartTag_v2(tag, { threshold: 0.5 }),
            }
            // { showOverlay: true }
            // { throwInDev: true }
        )
    }
}
export default validateHtmlTag

function suggestSimilarTag(input) {
    const shortcutTagMap = {
        btn: 'button',
        artcl: 'article',
        sect: 'section',
        footr: 'footer',
        hd: 'header',
        inp: 'input',
    }

    if (shortcutTagMap[input]) return shortcutTagMap[input]

    const candidates = ['div', 'section', 'article', 'footer', 'button', 'input', 'header', 'main', 'aside', 'nav', 'span', 'a', 'form']

    let closest = null
    let minDistance = Infinity

    for (const tag of candidates) {
        const dist = levenshtein(input, tag)
        if (dist < minDistance) {
            minDistance = dist
            closest = tag
        }
    }

    const maxDistance = input.length <= 3 ? 3 : 2
    return minDistance <= maxDistance ? closest : null
}
// function suggestSimilarTag(input) {
//     const candidates = Array.from(validHtmlTagSet)
//     const distance = (a, b) => [...Array(Math.max(a.length, b.length))].reduce((acc, _, i) => acc + (a[i] !== b[i] ? 1 : 0), 0)
//     console.log('candidates:', candidates)

//     const result = candidates.reduce(
//         (best, tag) => {
//             const d = distance(tag, 'input')
//             // const d = distance(tag, input)
//             console.log('RESULTED', d)
//             return d < best.distance ? { tag, distance: d } : best
//         },
//         { tag: null, distance: Infinity }
//     ).tag

//     // console.log('result:', result)

//     return result

//     return candidates.reduce(
//         (best, tag) => {
//             const d = distance(tag, input)
//             return d < best.distance ? { tag, distance: d } : best
//         },
//         { tag: null, distance: Infinity }
//     ).tag
// }

function levenshtein(a, b) {
    const m = a.length
    const n = b.length
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

    for (let i = 0; i <= m; i++) dp[i][0] = i
    for (let j = 0; j <= n; j++) dp[0][j] = j

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1, // 삭제
                    dp[i][j - 1] + 1, // 삽입
                    dp[i - 1][j - 1] + 1 // 교체
                )
            }
        }
    }

    return dp[m][n]
}
