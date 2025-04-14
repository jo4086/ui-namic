## dev-tools/suggestSmartTag.js

사용자가 커스텀 태그의 입력을 잘못했을 시 알려주는 함수

개발 이유: 개발단계에서 태그를 잘못입력하여도 렌더링은 되고 콘솔에만 경고창이 뜨는 구조에 대해서 시맨틱태그로 교체하고 싶을 시 이런 오타를 교정해주고 싶었고, 잘못된 입력값 비교는 단순 문자비교로 쉽지만 예상 태그를 추천은 어떻게 해줄까?? 라는 고민을 하게 되었다.

이에 대해서 생각한 나만의 알고리즘을 생각해보았다.

#### 1. 문자열의 길이의 순부터 시작

-   입력받은 문자열의 길이와 일치하는 문자열부터 점수도가 낮으면
-   해당 문자열길이의 +1인 데이터들과 비교 여기서도 점수가 낮으면
-   해당 문자열길이의 -1인 데이터들과 비교
-   점수가 어느정도 높거나 지정한 반복치까지 +1 -1을 양쪽으로 늘려가며 필터링

```js
const validTags = ['div', 'section', 'article', 'header', 'button', '...rest']

<Box type='setion'></Box>
```

-   위와 같이 유저가 `section`을 `setion`처럼 잘못 입력한 경우
-   먼저 입력값인 `setion`과 일치하는 문자열의 길이들을 가져온다. 예시로 `button`을 가져오겠다.

#### 2. 문자열의 절댓값 위치기반 정확도 비교

-   `setion`과 `button`이라는 두문자의 절대적 위치의 정확도를 계산한다.

`s`,`e`,`t`,`i`,`o`,`n`

`b`,`u`,`t`,`t`,`o`,`n`

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

`x`,`x`,`o`,`x`,`o`,`o`

#### 3. 전체 문자열이 겹치는지 비교

-   `setion`과 `button`의 전체 문자 포함여부를 비교
-   예시 데이터에서는

    `s`: false, `e`: false, `t`: true, `i`: false, `o`: true, `n`: true

-   여기서는 `t, o, n` 3개의 문자열이 `button`에 포함된다.

ㄴ

#### 4. **이에 대해 점수 합산을 매기고 점수값이 낮으면 인풋 값의 길이보다 +1 => -1 순으로 계속해서 비교**

-   이때 `setion`보다 문자열이 긴 `section` => `input`순으로 검증

-   문자열의 길이가 다르므로 비교할 문자열이 길면 인풋 문자열의 길이만큼 앞뒤를 슬라이스해서 각자 비교한다.

    -   `setion`.length: 6
    -   `section`.length: 7
    -   `sectio`.length: 6
    -   `ection`.length: 6

    -   `setion` ~> `sectio` 다시 위의 2번 3번과정을 계산
        -   `se.____` 로 앞 2개 일치
    -   `setion` ~> `ection` 다시 위의 2번 3번과정을 계산
        -   `__.tion` 으로 뒤 4개 일치
    -   양쪽의 일치율이 합해서 6이나 되며 뒤쪽 4개가 일치하고 앞쪽 2개가 일치한다는건 총길이 7개중에서 3번째위치가 부족하단걸 알 수 있다. 이런 누락인 경우는 매우높은 확률로 여기서 검증이 마쳐진다

    -   만약 입력값이 `article`의 누락인 `artice` 이였다면?

        -   `artice` vs `sectio`: 모든 위치에서 불일치
        -   `artice` vs `ection`: 2개 위치에서 일치

        -   `artice` < `sectio` : 4개 포함 (t,i,c,e)
        -   `artice` < `ection` : 4개 포함 (t,i,c,e)

        -   포함 여부는 높지만 위치비교에서 낮은 정확도를 가리키기에 패스한다.
        -   그럼 `section`처럼 7자리 문자열인 `article`과 비교를 하게된다.
        -   `artice` vs `articl`: `artic._` => 5개일치
        -   `artice` vs `rticle`: `_____.e` => 1개일치
        -   합하면 `artice`라는 문자열의 길이만큼 일치하게되므로 높은 정확성을 보인다
        -   여기에 전체 문자열 포함여부까지 가게되면
        -   `a,r,t,i,c,e` < `a,r,t,i,c,l,e` : 6개 모두 포함이므로 `article`에서 `artic._.e` => l이 빠진걸 추론할 수 있다.

    -   만약 입력값이 `arcle` 이였다면?
        -   `arcle` vs `artic` : 2개 일치
        -   `arcle` vs `ticle` : 뒤 3개일치
        -   `arcle`이라는 모든 문자열이 일치하게되고 그다음 포함성을 보면 모두 포함되므로 `article`을 유추하게된다.
    -   만약 입력값이 `atcile` 과 같이 누락과 오탈자가 섞여있다면?
        -   `atcile` vs `articl`: 2개 일치 (`a.__.i.__`)
        -   `atcile` vs `rticle`: 3개 일치 (`_.t.__.le`)
        -   도합 5개일치로 6개는아니지만 높은 일치율을 보인다.
        -   이를 밀림으로 보게되면
            -   `a__i__-`
            -   `-_t__le`
            -   `a_ti_le`이라는 문자열 7개의 가상 문자열 추론
            -   이 문자열을 다시 완성된 `article`이라는 문자열과 위치비교를 하게되면 무려 빈곳을 제외한 나머지가 일치하게되므로 정확히 오탈자 또는 누락을 제외한 나머지의 완성이 추론된다.

-   마지막 가정
-   `aticele`
-   `aticele` vs `article`
-   `a____le`
-   `a,t,i,c,l,e` `r`을 제외한 모두 포함
-   `tice` vs `arti`: `____`
-   `tice` vs `rtic`: `____`
-   `tice` vs `ticl`: `ti__`
-   밀림
-   `____---`
-   `-____--`
-   `--ti__-`
    조합
-   `a____le`
-   `a_ti_le`

마지막 가정은 입력길이 비교와 문자포함률을 봤을때 어느정도 가능성이 있을시에 높은 작업량을 요구하는 계산과정으로

1. aticele과 article의 문자열 정합성은 `a____le` = 3/7 = 42.85%
2. `a,t,i,c,e,l,e,`는 `a,r,t,i,c,l,e`라는 문자열에 6/7 = 85.7%의 포함율을 보인다.

이렇게 첫번째 조건이 40%이상 / 두번째 조건이 80%이상일 때

부족한 부분에 대해서 복원 작업을 통해 예측 단어를 추론한다

#### 5. 전체 점수합산

-   내용 미완

<1차 구현 코드>

```js
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
```

<2차 구현코드>

```js
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
```
