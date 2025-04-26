# @uinamic/colors 🎨 (0.2 version)

> [!NOTE]
> CSS color token generator centered on HSL lightness (HSL 기반 명도 중심 색상 스펙트럼 자동 생성기)

## ⅰ English

> ## ✨ Features
>
> > -   Generates a 9-step asymmetrical spectrum based on central lightness (100~900)
> > -   Built-in **brightness correction algorithm** for detecting extreme zones
> > -   **1:4 distribution-based color calculation** considering perceptual balance
> > -   Supports `:root` CSS variables, SCSS, and JSON formats
> > -   Zero-dependency, fast execution, available via CLI and API
>
> ## 🖐 Spectrum Structure
>
> `generateColorTokens()` generates a **9-step asymmetrical lightness spectrum** based on a central lightness value (`centerL`).
>
> > -   **Larger changes** near the center, **smaller steps** towards the edges.
> > -   **Smooth drop** towards low lightness, **wider spread** towards high lightness.
> > -   `limit` option restricts the allowable lightness range.
>
> Example: If limit is 20, tokens are generated within 20%~80% of the full 0~100 lightness range.

## ⅱ Korean

> ## ✨ 주요 특징
>
> > -   중심 명도(L)를 기준으로 9단계 비대칭 스펙트럼 생성 (100~900)
> > -   극단 영역 자동 감지 및 **밝기 보정 알고리즘** 탑재
> > -   perceptual 균형을 고려한 **1:4 분포 기반 색상 계산**
> > -   `:root` 내 CSS 변수 혹은 SCSS/JSON 포맷 지원
> > -   zero-dependency, 빠른 실행, CLI 및 API 모두 사용 가능
>
> ## 🖐 스펙트럼 구조
>
> > `generateColorTokens()`는 중심 명도값(`centerL`)을 기준으로 **비대칭적인 9단계 명도 분할**을 생성합니다.
> >
> > -   중심과 가까워지면 명도 변화가 **큰** 것이 특징.
> > -   거리가 멀어지면서 명도 변화량이 **작아진다**.
> > -   낮은 방향은 수직적으로 낮아지고, 높은 방향은 넓게 확장됩니다.
> > -   `limit` 옵션은 중심 명도 기준으로 명도 범위를 제한합니다.
>
> 예시: limit 값이 20일 경우, 0~100 범위 내에서 20%~80% 구간에서만 토큰이 생성됩니다.

## 📦 Installation (설치)

```bash
npm install -D @uinamic/colors
# or
pnpm add -D @uinamic/colors
```

<details>
<summary>🧩 Detail (English)</summary>

### 📖 Example (centerL = 50)

※ `generateColorTokens` automatically adjusts results within a 0~100 lightness range.

```plaintext
[5, 16, 27, 38, (50), 62, 73, 84, 95]
[  ↑   ↑   ↑   ↑     ↑   ↑   ↑   ↑]
[ 11  11  11  12     12  11  11  11] ← Step intervals
```

-   (50) is the central lightness.
-   Gradual division near the center with smart bias adjustments.
-   If `centerL` is below 20 or above 80:
    -   `limit` is fixed to 3.
    -   `lowRange = centerL - 3`
    -   `highRange = lowRange * 4`

---

### 🧪 Example (pink)

```ts
pink: [340, 100, 88] → [52, 58, 64, 70, 76, 82, 88, 94, 97]
```

## 📂 Options

| Option | Description                                            |
| ------ | ------------------------------------------------------ |
| format | Output format ('css', 'scss', 'json') (default: 'css') |
| prefix | Variable prefix (default: '--color-')                  |
| name   | Output file name (default: 'uinamic-color')            |
| path   | Output directory (default: './theme')                  |
| limit  | Lightness range limit (e.g., 20 means 20%~80%)         |

---

## 🛠️ Usage

### 🧹 1. Run directly via terminal (npx)

```bash
npx @uinamic/colors
npx @uinamic/colors --name color
npx @uinamic/colors --format css
npx @uinamic/colors --format scss
npx @uinamic/colors --prefix theme
npx @uinamic/colors --path ./palette
npx @uinamic/colors --limit 20

# Composite options example
npx @uinamic/colors --path ./palette --name palette --format scss --prefix font-color --limit 20
```

---

### 🧹 2. Use with a custom color map

```js
import { generateColorTokens } from '@uinamic/colors'

const myColorMap = {
    mint: [160, 100, 50],
    coral: [16, 100, 60],
}

const css = generateColorTokens(myColorMap)

// Run node generate-color-css.js
```

---

## 🌈 Custom Colormap & Advanced Options

```js
const scss = generateColorTokens(
    {
        mint: [160, 100, 50],
    },
    {
        format: 'scss',
        prefix: 'theme',
        name: 'color',
        path: './custom',
        limit: 8,
    }
)
```

#### Example Output

```scss
$theme-mint-100: hsl(160, 100%, 8%);
$theme-mint-200: hsl(160, 100%, 18%);
...
$theme-mint-900: hsl(160, 100%, 92%);
```

---

## 💡 Default Provided Colors

```js
{
  red: [0, 100, 50],
  blue: [240, 100, 50],
  yellow: [60, 100, 50],
  orange: [39, 100, 50],
  green: [120, 100, 40],
  purple: [270, 100, 60],
  pink: [340, 100, 88],
  teal: [180, 100, 45],
  gray: [0, 0, 50],
  darkgray: [0, 0, 30],
  lightgray: [0, 0, 70],
  coral: [16, 100, 65],
  mint: [160, 100, 50],
  cyan: [190, 100, 60],
  violet: [290, 76, 72],
  indigo: [225, 100, 45],
  amber: [45, 100, 50],
}
```

---

## 💡 CSS Variable Example

```css
:root {
  --color-black: hsl(0, 0%, 0%);
  --color-white: hsl(0, 0%, 100%);
  --color-red-100: hsl(0, 100%, 5%);
  ...
  --color-blue-900: hsl(240, 100%, 95%);
}
```

---

## 💡 Future Plan (v0.3)

-   Add `offset` option to adjust spectrum baseline.

```ts
generateColorTokens(
    {
        mint: [160, 100, 50],
    },
    {
        format: 'css',
        offset: 2,
    }
)
```

**Example Output:**

```css
--color-mint-100: hsl(160, 100%, 7%);
--color-mint-200: hsl(160, 100%, 12%);
--color-mint-300: hsl(160, 100%, 18%);
--color-mint-400: hsl(160, 100%, 25%);
--color-mint-500: hsl(160, 100%, 32%);
--color-mint-600: hsl(160, 100%, 42%);
--color-mint-700: hsl(160, 100%, 50%); /* center */
--color-mint-800: hsl(160, 100%, 59%);
--color-mint-900: hsl(160, 100%, 69%);
```

</details>

<details>
<summary>🧩 자세히 (Korean)</summary>

### 📖 예시 centerL = 50

※ `generateColorTokens`는 항상 명도 0\~100 범위 내에서 결과를 자동 조정합니다.

```plaintext
[5, 16, 27, 38, (50), 62, 73, 84, 95]
[  ↑   ↑   ↑   ↑     ↑   ↑   ↑   ↑]
[ 11  11  11  12     12  11  11  11] ← 명도 간격
```

-   (50)은 중심 명도값입니다.
-   가까운 가까운 분할이지만, 중심부(값 12)를 기점으로 약간의 비율 조정이 있습니다.
-   `smartBias + delta` 가용치를 적용하여 감각적인 스텝플러버스트를 생성합니다.
-   **입력값이 `20 이하 또는 80 이상`인 경우:**
    -   limit 값은 3으로 고정합니다.
    -   `lowRange = centerL - 3`
    -   `highRange = lowRange * 4`
    -   전체 명도 구조는 0\~100 범위를 사용합니다.

---

### 🧪 예시 (pink)

```ts
pink: [340, 100, 88] → [52, 58, 64, 70, 76, 82, 88, 94, 97]
```

---

## 📂 옵션 설명

| 옵션   | 설명                                                 |
| ------ | ---------------------------------------------------- |
| format | 출력 포맷 ('css', 'scss', 'json') 선택 (기본: 'css') |
| prefix | CSS 변수 전치키 지정 (기본: '--color-')              |
| name   | 생성할 파일명 (기본: 'uinamic-color')                |
| path   | 파일 저장 경로 (기본: './theme')                     |
| limit  | 명도 허용 범위 설정 (ex: 20 → 20%\~80%)              |

---

## 🛠️ 사용법

### 🧽 1. 터미널에서 바로 실행 (npx)

```bash
npx @uinamic/colors
npx @uinamic/colors --name color
npx @uinamic/colors --format css
npx @uinamic/colors --format scss
npx @uinamic/colors --prefix theme
npx @uinamic/colors --path ./palette
npx @uinamic/colors --limit 20

# 복합 옵션 예시
npx @uinamic/colors --path ./palette --name palette --format scss --prefix font-color --limit 20
```

---

### 🧽 2. 사용자 정의 색상맵 사용

```js
import { generateColorTokens } from '@uinamic/colors'

const myColorMap = {
    mint: [160, 100, 50],
    coral: [16, 100, 60],
}

const css = generateColorTokens(myColorMap)

// node generate-color-css.js 실행
```

---

## 🎨 커스텀 컬러맵 & 옵션 사용법

```js
const scss = generateColorTokens(
    {
        mint: [160, 100, 50],
    },
    {
        format: 'scss',
        prefix: 'theme',
        name: 'color',
        path: './custom',
        limit: 8,
    }
)

// node color-css.js
```

#### 출력 결과 (예시)

```scss
$theme-mint-100: hsl(160, 100%, 8%);
$theme-mint-200: hsl(160, 100%, 18%);
...
$theme-mint-900: hsl(160, 100%, 92%);
```

---

## 💡 기본 제공 색상맵

```js
{
  red: [0, 100, 50],
  blue: [240, 100, 50],
  yellow: [60, 100, 50],
  orange: [39, 100, 50],
  green: [120, 100, 40],
  purple: [270, 100, 60],
  pink: [340, 100, 88],
  teal: [180, 100, 45],
  gray: [0, 0, 50],
  darkgray: [0, 0, 30],
  lightgray: [0, 0, 70],
  coral: [16, 100, 65],
  mint: [160, 100, 50],
  cyan: [190, 100, 60],
  violet: [290, 76, 72],
  indigo: [225, 100, 45],
  amber: [45, 100, 50],
}
```

---

## 💡 CSS 변수 형식 예시

```css
:root {
  --color-black: hsl(0, 0%, 0%);
  --color-white: hsl(0, 0%, 100%);
  --color-red-100: hsl(0, 100%, 5%);
  ...
  --color-blue-900: hsl(240, 100%, 95%);
}
```

---

## 💡 향후 계획 (v0.3)

-   offset 옵션 추가
    -   스펙트럼의 기본 위치 조정 가능

```ts
generateColorTokens(
    {
        mint: [160, 100, 50],
    },
    {
        format: 'css',
        offset: 2,
    }
)
```

-   결과

```css
--color-mint-100: hsl(160, 100%, 7%);
--color-mint-200: hsl(160, 100%, 12%);
--color-mint-300: hsl(160, 100%, 18%);
--color-mint-400: hsl(160, 100%, 25%);
--color-mint-500: hsl(160, 100%, 32%);
--color-mint-600: hsl(160, 100%, 42%);
--color-mint-700: hsl(160, 100%, 50%); /* 중심 */
--color-mint-800: hsl(160, 100%, 59%);
--color-mint-900: hsl(160, 100%, 69%);
```

</details>
