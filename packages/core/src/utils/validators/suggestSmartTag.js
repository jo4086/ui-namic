// 🔍 SmartTypoMatcher: 휴리스틱 기반 오타 추천 유틸

/*
 * 논리 흐름
 */

const validTags = ['div', 'section', 'article', 'header', 'footer', 'main', 'nav', 'aside', 'button', 'input', 'textarea', 'form', 'label', 'a', 'ul', 'li', 'ol', 'table', 'thead', 'tbody', 'tr', 'td', 'th', 'span']

// 1. Levenshtein 거리 계산
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
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
            }
        }
    }
    return dp[m][n]
}

// 2. 문자 존재 유사도
function charOverlap(a, b) {
    const aSet = new Set(a.split(''))
    const bSet = new Set(b.split(''))
    const common = [...aSet].filter((ch) => bSet.has(ch)).length
    return common / Math.max(aSet.size, bSet.size)
}

// 3. 부분 일치 점수 (슬라이딩 매칭)
function slidingMatchScore(input, target) {
    const lenDiff = target.length - input.length
    if (lenDiff < 0 || lenDiff > 2) return 0

    const slices = []
    for (let i = 0; i <= lenDiff; i++) {
        slices.push(target.slice(i, i + input.length))
    }

    let maxMatch = 0
    for (const slice of slices) {
        let match = 0
        for (let i = 0; i < input.length; i++) {
            if (input[i] === slice[i]) match++
        }
        maxMatch = Math.max(maxMatch, match)
    }
    return maxMatch / input.length
}

// 4. 최종 추천 알고리즘
export function suggestSmartTag(input, { threshold = 0.5 } = {}) {
    const candidates = validTags.filter((tag) => Math.abs(tag.length - input.length) <= 2)

    let bestScore = -1
    let bestTag = null

    for (const tag of candidates) {
        const lev = levenshtein(input, tag)
        const overlap = charOverlap(input, tag)
        const slide = slidingMatchScore(input, tag)

        const score = (1 - lev / Math.max(input.length, tag.length)) * 0.5 + overlap * 0.3 + slide * 0.2

        if (score > bestScore) {
            bestScore = score
            bestTag = tag
        }
    }

    return bestScore > threshold ? bestTag : null
}
