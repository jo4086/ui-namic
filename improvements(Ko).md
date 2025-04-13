# improvements(Korean)

## 2025-04-10

### 1. 모듈 독립화

-   각 모듈을 완전히 독립적인 단위로 분리하여, 단위 테스트와 재사용성을 높임.

-   **예시:**

    -   `buildBaseModule`
    -   `buildPseudoModule`
    -   `buildMediaModule`
    -   `buildKeyframesModule`

### 2. META 시스템 연결

-   **META 객체**를 통해 각 모듈의 **고유 정보**를 일관되게 관리하고,

-   모든 모듈이 **META**를 참조하게 하여 **중복 코드** 방지 및 유지보수성 향상.

### 3. Media 재구성

-   **media 모듈**을 **다이나믹과 키프레임과 연결**하고,

-   각 모듈은 **특정 조건**을 바탕으로 **중첩 구조를 동적으로 처리**하도록 설계.

### 4. 모듈 호출 및 번들 파이프라인 구성

-   `buildStyleBundle`을 통해 **모듈을 호출하고 조합하는 파이프라인**을 정의.

-   미디어와 다이나믹 그리고 키프레임이 어떻게 재귀적으로 호출되고 각각의 관계를 정의할지 설계.

### 5. 다이나믹/베이스 플래그로 구분

-   **다이나믹**과 **베이스**의 차이를 **플래그**로 관리하고,

-   **플래그에 따라 클래스 네이밍**과 **고유 아이디 기반의 키프레임 네이밍을 동적**으로 변경.

## 2025-04-11

### 1. 스타일 시스템의 비동기 생성

-   base, pseudo, media, keyframes를 비동기로 각각 동시에 생성하고 response형태로 받아와 최종적으로는 순서대로 삽입

🧠 스타일 시스템: 비동기 렌더링 아이디어 요약
🎯 목적
스타일 생성 로직을 병렬 비동기로 처리하여 성능 최적화

모듈별 스타일 처리와 DOM 삽입을 분리

삽입 순서를 제어하며 안정성 확보

### ✅ 전체 흐름 개요

buildStyleBundle(styleProps, META)
→ base, pseudo, media, keyframes 블록을 비동기 생성

insertStyleBundle(response)
→ 생성된 블록을 삽입 순서대로 insert

⏱ 병렬 스타일 생성 예시
js
복사
편집
const response = await Promise.all([
buildBaseModule(styleProps.string),
buildPseudoModule(styleProps.pseudo, META),
buildMediaModule(styleProps.media, META),
buildKeyframesModule(styleProps.keyframes, META),
]).then(([base, pseudo, media, keyframes]) => ({
base,
pseudo,
media,
keyframes,
}))
🧩 순서 보장 삽입
js
복사
편집
if (response.keyframes) {
for (const block of response.keyframes.styleBlocks) {
insertKeyframesStyleOnce(block.name, block.css, { raw: true })
}
}

if (response.base) {
insertBaseStyleOnce(selector, response.base)
}

if (response.pseudo) {
for (const block of response.pseudo) {
insertBaseStyleOnce(block.name, block.css)
}
}

if (response.media) {
for (const block of response.media) {
insertMediaStyleOnce(block.name, block.css)
}
}
💡 장점
✅ 병렬 처리로 렌더 블로킹 최소화

✅ 삽입 순서 분리로 안정성 확보 (keyframes → base → pseudo/media)

✅ 스타일 생성과 DOM 삽입 로직을 분리

✅ response 객체를 캐싱하여 재사용 최적화 가능

📦 추가 확장 가능성
구조 설명
buildStyleBundle() 비동기 스타일 생성
insertStyleBundle() 순차 삽입 핸들러
buildStylePreview() style만 생성해 미리보기 가능
extractStyleSSR() SSR 시 스타일만 추출 가능

## 2025-04-12

### ✅ 1. 스타일 입력 구분

| 프롭스              | 설명                                       | 대상                         |
| ------------------- | ------------------------------------------ | ---------------------------- |
| style               | React 기본 스타일 프롭                     | 항상 인라인으로 DOM에 적용   |
| inline              | style을 인라인으로 넣을지 명시하는 boolean | 클래스 삽입 생략 트리거      |
| dx                  | 시스템 DSL 스타일 정의 (class 삽입 기반)   | base, pseudo, media, dy 포함 |
| dnClick, dnFocus 등 | 단일 동적 스타일 이벤트용 프롭 (간편 버전) | DSL 없이 빠르게 적용         |

### ✅ 2. dx 구조 (정식 DSL 컨테이너)

```jsx
const dx = {
    // base 상태 스타일
    color: 'black',
    padding: '20px',
    hover: { backgroundColor: '#eee' },
    focus: { outline: '2px solid red' },

    // event 상태 스타일
    dy: {
        onClick: {
            backgroundColor: 'red',
            hover: { borderColor: 'blue' },
        },
        onFocus: { outline: '2px solid purple' },
    },
}

<Box dx={dx} />
```

### ✅ 3. 동작 처리 흐름

| 대상               | 처리 방식                                                                |
| ------------------ | ------------------------------------------------------------------------ |
| style              | 인라인 삽입 (inline=true 없으면 시스템에서 무시 or class화)              |
| dx.base            | className으로 렌더링 (스타일 태그에 삽입)                                |
| dx.hover, dx.focus | .ClassName:hover 형태로 스타일 태그에 삽입                               |
| dx.dy[event]       | **.ClassName.\_\_dynamic**, **.ClassName.\_\_dynamic:hover** 형태로 삽입 |
| dnClick={}         | dy.onClick 축약 버전 → 자동 트리거 추론 + class 삽입                     |

### ✅ 4. 가상 선택자 처리 방식

-   별도 pseudo 키 없이 hover, focus 등 키가 나오면 자동으로 pseudo 처리
-   dy 내부의 pseudo도 .\_\_dynamic:hover 등으로 자동 컴파일됨

### ✅ 5. 클래스 생성 & 스타일 삽입 예시

```css
/* dx base */
.UINAMIC_BOX_abcd1234 {
    color: black;
    padding: 20px;
}

/* static pseudo */
.UINAMIC_BOX_abcd1234:hover {
    background-color: #eee;
}

/* dynamic (dy.onClick) */
.UINAMIC_BOX_abcd1234.__dynamic {
    background-color: red;
}

.UINAMIC_BOX_abcd1234.__dynamic:hover {
    border-color: blue;
}
```

### ✅ 6. DX 설계 철학

-   기본은 자동, 필요 시 명시적으로 override (inline, dnX, dx)
-   CSS 문법에 유사하지만 더 구조적
-   스타일, 조건, 상태 모두 한 오브젝트 내에서 선언 가능
-   확장성과 자동 추론이 공존하는 DSL 설계

## 2025-04-13

### 1. 서로 다른 컴포넌트의 이벤트 관계성으로 인한 스타일 초기화 이슈

문제 코드

```jsx
import { Box, Button } from '@react-ui'
import { useState } from 'react'

const Main = () => {
    const [count, setCount] = useState(0)

    return (
        <Box>
            <Button onClick={() => setCount((count) => count + 1)} dyClick="font-size:2rem;" dyOrder={['onClick', 'onFocus']} dyState={{ onClick: 'count', onFocus: 'on' }}>
                count is {count}
            </Button>
            <Button onClick={() => setCount((count) => (count = 0))}>
                count Reset
            </Button>
        </Box>
    )
}
```
