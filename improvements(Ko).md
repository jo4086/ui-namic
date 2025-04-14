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
            <Button onClick={() => setCount((count) => (count = 0))}>count Reset</Button>
        </Box>
    )
}
```

내가 만든 컴포넌트들은 `generateRenderData.js`를 통해 생성이 되는데 이때 이벤트를 관리하는 `useDynamicTrigger.js`는 생성한 컴포넌트마다 독립적으로 스테이트를 가지게 된다.

일반적인 toggle-onClick은 해당 태그만으로만으로 상태를 on-off로 변경하여 하나의 태그만으로 스타일을 동적으로 바꿀 수 있지만

위와같은 카운터형의 onClick에서 카운트가 존재할 때 스타일이 변경된다면 보통 다른 onClick을 통해 count를 초기화하는데

이때 두번째로 count를 초기화해도 `useDynamicTrigger.js`에서는 이 초기화를 두번째 컴포넌트를 초기화 시키지 첫번째 컴포넌트의 카운트는 사라져도 onClick 상태를 `false`로 바꾸지 못한다.

이에 1차 개선안으로는 watch기능을 추가하였고 해당 코드는 아래와 같다.

```jsx
import { Box, Button } from '@react-ui'
import { useState } from 'react'

const Main = () => {
    const [count, setCount] = useState(0)

    return (
        <Box>
            <Button onClick={() => setCount((count) => count + 1)} dyClick="font-size:2rem;" dyOrder={['onClick', 'onFocus']} dyState={{ onClick: 'count', onFocus: 'on' }} watchValueMap={{ count }}>
                count is {count}
            </Button>
            <Button onClick={() => setCount((count) => (count = 0))}>count Reset</Button>
        </Box>
    )
}
```

여기서 초기화할 대상에 `watchValueMap={{ count }}` props를 추가하였고 `useDynamicTrigger.js`의 코드를 수정하여 count상태를 추적 => 다른곳에 의해 카운트가 초기화 됐다는 플래그를 체크하여 카운트를 관리하는 태그의 스타일 플래그 해제는 성공하였다.

그러나 여기서 다른 고민이 생겨버렸다. count라는 동일한 이름만을 감지한다면??

만약 A페이지의 하위로 B C D E 자식 컴포넌트가 존재하고
B의 자식중 어딘가에서 count, setCount로 관리하는게 있으며, D의 자식중 어딘가에서 똑같이 count, setCount로 관리하는 구조가 있다고 가정하였다.

둘의 관계는 서로 다른 함수이기에 같은 변수명이여도 지역스코프란 특성에의해 서로 문제는 발생하지 않지만, 이걸 `watchValueMap`에서는 둘다 똑같은 count로만 감지하기에 B의 카운트해제로 인해 D의 카운트가 존재하지만 사라질 수 있지 않을까란 고민이 생겼다.

그래서 어떻게해야 서로 연결되는 컴포넌트만을 내가 감지하여서 독립적으로 처리해줄 수 있을까에 대해 다시 고민하게 되었고

이걸 다시 사용자에게 플래그를 따로 써달라고 하기에는 사용자는 너무 불편하고 귀찮은 일이 추가되며 따로 학습해야하는 키를 배워야하는 상황이 연출된다. 그로인해 사실 watchValueMap도 추가하는것도 마음에 들지 않았었다.

그럼 어떻게 해야할까...

그러다가 제너레이터 렌더 데이터를 통해 컴포넌트를 생성할 때 children이라는 props에 눈길이 갔다.

버튼 컴포넌트라던지는 일단 children의 가장 마지막에 존재하며 버튼 컴포넌트 내부는 다른 함수형 컴포넌트는 오지 못할것이다. 굳이 버튼이 아닌 div에 onClick을 준 상황이라 해도 아마 마찬가지일꺼라 판단하였고

children을 분석하여 내부에 함수형이나 태그같이 렌더링되는 자식요소가 없으며 이벤트가 존재시에 마지막 노드라고 단순하게 추론하였고

children을 `console.log`로 내부를 탐색하니 `$$typeof`라는 키가 존재한다면 자식은 무조건 렌더링하는 요소라는걸 알 수 있었다.

그럼 이를 역추적하면 `generateRenderData.js`로 호출한 chdilren을 통해 적어도 내껄 호출하기 시작한것들의 모든 내부의 중첩구조를 가상화 할 수 있지 않을까?? 란 생각을 하게 되었다.

아직 나의 개발실력은 많이 부족하여 생각은 했지만 구현은 쉽지 않을꺼 같다는 생각이 들게되었고

해당 문제에 대한 해결과정에 대해서만 기록하기로 한다. 추후 해당 문제는 이 내용을 기반으로 가상 컴포넌트 트리를 재현하여 서로 같은 이벤트의 스테이트를 공유하는 컴포넌트끼리 추적하는게 개발에서 첫번째로 가장 큰 관문이라 생각한다.

이 가상트리는 잘못한다면 많은 성능이슈를 불러일으킬 것 같기도 하여

루트만 children을 검색한다던지, 그럼 렌더데이터는 호출하지 않은 보이지 않는 루트가 있다면 내 렌더데이터 호출은 병렬적 루트구조 일 수도 있고 다양한 관점에서 많은 고민을 해야할 것 같다.

이상으로 미숙한 개발자의 해결하지 못하는 버그에 대한 고찰을 마친다.

## 2025-04-14

### 1. 유효성 검증 및 에러처리 관심사 분리

개발자가 해당 라이브러리를 사용하면서 개발시에 유효성검증및 에러처리는 도움이 될 거라 생각하고 추가한 기능들은 왜 다른 프레임워크나 라이브러리들은 크게 지원하지 않을까 생각해 보았다

그러다가 완성된것을 배포시 내부에 해당 코드들이 있다면 사용하지 않는 데드코드가 된다는 것을 알게 되었고

유효성 검증 및 에러처리에 대한 코드는 외부패키지로 분리하여 개발자가 편의성을 원한다면 추가적으로 `npm i -D @uinamic/dev-tools`같이 개발전용으로 설치만 하면 에러를 투척하거나 유효성검증을 제대로 해주기로 방향을 재검토하였다.

### 2. 태그변환에 대한 에러처리 및 추측태그 추천

기존에는 코드작성시 `<artic></artic>`과같이 아예 잘못된 태그여도 개발자 도구의 콘솔에는 경고창은 뜨지만 스타일은 제대로 적용되는 기이한 구조를 발견하게 되었다.

내가 만든 함수형 컴포넌트는 `<Box type='article'>`형식으로 태그를 유저가 원하는 태그로 교체할 수 있는 기능이 있는데

이때 오타가나면 해당 오타를 보여주며 비슷한 다른 예측 태그를 추천해주고 싶었다.

그 과정중 레벤슈타인의 길이라는 알고리즘도 알게 되었고

그 외에 나만의 생각으로 어떻게 저것을 교정해줄까 스스로 생각해보았다.

부족하고 비효율적일 순 있으나 일단 내가 생각하는 흐름의 처리는 이렇다

1. 문자열 길이 기반 각 문자열위치에 대해서 정확도 비교
2. 문자열 길이가 다르면 부족한 길이쪽에 맞춰서 맨앞 / 맨뒤로 쪼갠후 1번처럼 비교
3. 입력 문자열이 비교할 문자열에 대해 전체적으로 얼마나 포함되는지 (`setion` < `section` : 7개중 6개 포함으로 입력값기준 100%, 비교값 기준 85% 포함한다.)
4. 문자열 길이의 정확도가 40%이상 / 문자율 포함율이 80% 이상으로 2가지 조건을 동시 만족시 더 깊은 문자열 비교로 추측 문자열에 대한 복구기능

5. 각 기능에 대해 일정 점수를 매기고 최종점수가 0.5 이상일시 해당 태그를 추천 태그로 넣는다.
