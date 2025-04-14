const validTags = ['div', 'section', 'article', 'header', 'footer', 'main', 'nav', 'aside', 'button', 'input', 'textarea', 'form', 'label', 'a', 'ul', 'li', 'ol', 'table', 'thead', 'tbody', 'tr', 'td', 'th', 'span']

// 1. Levenshtein 거리
function levenshtein(a, b) {
    const m = a.length,
        n = b.length
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))
    for (let i = 0; i <= m; i++) dp[i][0] = i
    for (let j = 0; j <= n; j++) dp[0][j] = j
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
        }
    }
    return dp[m][n]
}

// 2. 문자 포함율
function charSetOverlap(a, b) {
    const setA = new Set(a),
        setB = new Set(b)
    const common = [...setA].filter((ch) => setB.has(ch)).length
    return common / setA.size
}

// 3. 위치 일치율
function positionalMatchScore(a, b) {
    const len = Math.min(a.length, b.length)
    let match = 0
    for (let i = 0; i < len; i++) {
        if (a[i] === b[i]) match++
    }
    return match / len
}

// 4. 가상 복원 문자열 생성
function reconstructVirtualPattern(input, candidate) {
    const base = Array(candidate.length).fill('_')
    for (let i = 0; i < candidate.length; i++) {
        if (input.includes(candidate[i])) base[i] = candidate[i]
    }

    const inputLen = input.length
    const diff = candidate.length - inputLen
    const fragments = []
    for (let i = 0; i <= diff; i++) {
        fragments.push(candidate.slice(i, i + inputLen))
    }

    const partials = fragments.map((fragment) => {
        const arr = []
        for (let i = 0; i < inputLen; i++) {
            arr[i] = fragment[i] === input[i] ? fragment[i] : '_'
        }
        return arr
    })

    for (let i = 0; i < base.length; i++) {
        const charsAtI = partials.map((p) => p[i - 1] || '_').filter((ch) => ch !== '_')
        const charCount = charsAtI.reduce((acc, ch) => {
            acc[ch] = (acc[ch] || 0) + 1
            return acc
        }, {})
        const bestChar = Object.entries(charCount).find(([_, count]) => count >= 2)
        if (bestChar) base[i] = bestChar[0]
    }

    return base.join('')
}

// 5. deep match 조건
function shouldTriggerDeepMatch(input, candidate) {
    const overlapRate = charSetOverlap(input, candidate)
    if (overlapRate < 0.8) return false

    const virtual = reconstructVirtualPattern(input, candidate)
    const matchRate = positionalMatchScore(virtual, candidate)

    return matchRate >= 0.4
}

// 6. 최종 추천 함수
export function suggestSmartTag(input, { threshold = 0.5 } = {}) {
    if (!input) return null

    const candidates = validTags.filter((tag) => Math.abs(tag.length - input.length) <= 2)

    let bestTag = null
    let bestScore = -1

    for (const tag of candidates) {
        const lev = levenshtein(input, tag)
        const overlap = charSetOverlap(input, tag)
        const position = positionalMatchScore(input, tag)

        let score = (1 - lev / Math.max(input.length, tag.length)) * 0.5 + overlap * 0.3 + position * 0.2

        if (shouldTriggerDeepMatch(input, tag)) {
            const virtual = reconstructVirtualPattern(input, tag)
            const virtualScore = positionalMatchScore(virtual, tag)
            score += virtualScore * 0.3 // deep match 보정 가중치
        }

        if (score > bestScore) {
            bestScore = score
            bestTag = tag
        }
    }

    return bestScore >= threshold ? bestTag : null
}
