# 🎨 HSL 기반 컬러 스펙트럼 생성 로직

### 작동 원리

HSL 색상 체계에서 lightness(명도) 값이 0 또는 100일 경우,
해당 색상은 각각 절대적인 블랙 또는 화이트가 되어 스펙트럼으로서의 의미를 잃게 됩니다.
따라서 스펙트럼 생성 시에는 해당 극단값을 포함하지 않는 것이 원칙입니다.

또한 lightness 값이 0이나 100에 너무 근접한 색상은
조금만 변화해도 급격한 색상 전환이 발생하므로,
이 역시 조정 폭을 제한하여 신중히 처리해야 합니다.

##

### ⚙️ 명도 범위 분할 전략

입력된 lightness 값에 따라 다음 세 가지 범위로 분기하여 처리합니다.

##

### 1. lightness가 30~70 사이인 경우 (일반 범위)

> **기준점 중심 분기형 스펙트럼**

-   `100 - lightness` → 상한 계산용 base

-   `limit = floor(base / 3)` → 블랙/화이트 도달 방지

-   `usable = lightness - limit`

-   `step = usable - (usable % 4)` → 4등분 가능한 단위 확보

-   `stepSize = step / 4`

중심값을 기준으로 앞뒤로 4단계씩 간격을 계산하여 **9단계 스펙트럼**을 구성합니다.

예시

```js
복사
편집
const lightness = 40
const base = 100 - lightness // 60
const limit = Math.floor(base / 3) // 20
const usable = lightness - limit // 20
const step = usable - (usable % 4) // 20
const stepSize = step / 4 // 5

// 생성된 스펙트럼
// [20, 25, 30, 35, (40), 45, 50, 55, 60] 2. lightness가 70 이상 또는 30 이하인 경우 (극단 영역)
```

##

### 2. lightness가 70 이상 또는 30 이하인 경우 (극단 영역)

> **화이트 또는 블랙에 가까운 색상**

#### 📌 처리 로직 요약

| 항목     | 블랙 쪽(≤30)                                   | 화이트 쪽(≥70)  |
| -------- | ---------------------------------------------- | --------------- |
| base     | lightness                                      | 100 - lightness |
| usable   | base \* (2 / 3)                                | 동일            |
| step     | Math.floor(usable)에서 4로 나눠떨어지도록 보정 |                 |
| stepSize | step / 4                                       |                 |

#### ✅ 생성 공식

```js
Array.from({ length: 9 }, (_, i) => +(lightness + (i - 4) * stepSize).toFixed(1))
```

-   중심값 기준 ± stepSize \* n 방식

-   toFixed(1)로 소수 첫째자리까지만 유지

##

### ✅ 최종 결과 예시

```css
:root {
    --color-pink-100: hsl(350, 100%, 80%);
    --color-pink-200: hsl(350, 100%, 82%);
    --color-pink-300: hsl(350, 100%, 84%);
    --color-pink-400: hsl(350, 100%, 86%);
    --color-pink-500: hsl(350, 100%, 88%);
    --color-pink-600: hsl(350, 100%, 90%);
    --color-pink-700: hsl(350, 100%, 92%);
    --color-pink-800: hsl(350, 100%, 94%);
    --color-pink-900: hsl(350, 100%, 96%);
}
```

##

### 🖤 예외 컬러: 블랙과 화이트

lightness = 0 또는 100은 명확한 단색이므로
별도의 스펙트럼 없이 단일 값만 변수로 정의합니다.

```css
:root {
    --color-black: hsl(0, 0%, 0%);
    --color-white: hsl(0, 0%, 100%);
}
```

##

### 📌 요약 정리

| 조건                | 처리 방식                                  |
| ------------------- | ------------------------------------------ |
| 30 < lightness < 70 | 기준값 ± stepSize 방식으로 9단계 분기      |
| lightness ≥ 70      | 100 - lightness 기반으로 상한 조정         |
| lightness ≤ 30      | lightness 기반으로 하한 조정               |
| 극단값 도달 방지    | usable 영역의 1/3을 제한선(limit)으로 설정 |
| step 보정           | 항상 4로 나눠떨어지는 값으로 round         |
| 결과 개수           | 총 9단계 (100 ~ 900), 기준값은 항상 500    |
