# @uinamic/colors 🎨

> HSL 기반 명도 중심 색상 스펙트럼을 자동 생성해주는 CSS 변수 토큰 생성기입니다.

## ✨ 특징

-   lightness 중심 9단계 색상 스펙트럼 생성
-   극단값(black/white) 회피 및 perceptual 균형 유지
-   CSS 변수 (`--color-red-500`, `--color-blue-800` 등) 출력
-   zero-dependency, 빠른 빌드, 커스터마이징 가능

## 📦 설치

```bash
npm install @uinamic/colors
```

or

```bash
pnpm add @uinamic/colors
```

## 🛠️ 사용법

### 🧭 1. 터미널에서 바로 실행

-   출력 파일 기본 경로: `./theme/color.css`

```bash
# bash
npx @uinamic/colors
```

-   출력 파일 경로 지정

```bash
# bash
npx @uinamic/colors --output ./custom/custom.css
```

### 🧭 2. 사용자 정의 색상맵 사용

```js
// generate-color-css.js
import fs from 'fs'
import { generateColorTokens } from '@uinamic/colors'

// 사용자 정의 색상맵
const myColorMap = {
    mint: [160, 100, 50],
    coral: [16, 100, 60],
}

// CSS 변수 문자열 생성
const css = generateColorTokens(myColorMap)

// 파일로 저장
fs.writeFileSync('color.css', css, 'utf-8')
```

## 🧪 실행 방법

```bash
# bash
node generate-color-css.js
```

## 🎨 기본 제공 색상맵

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
``
```

## 💡 출력 예시 (CSS 변수)

```css
:root {
    --color-red-100: hsl(0, 100%, 18%);
    --color-red-500: hsl(0, 100%, 50%);
    --color-red-900: hsl(0, 100%, 82%);
}
```

## 🧩 커스터마이징

```js
generateColorTokens(myMap)
```

-   myMap 형식: { [colorName]: [h, s, l] }

-   각 색상은 중심 lightness 값 기준으로 9단계 (100~900) 변수로 생성됩니다.
