# ui-namic

## 주의

해당 프로젝트는 **javaScript**기반으로 만들어졌습니다. 개발자 공부를 시작한지 7~8개월이기에 **typeScript**까지 적용하기에는 배울게 너무 많아 먼저 **javaScript**로 만들었습니다.

전체적으로 미완성인 상태이므로 `JSDoc`도 작성하지 못한점 양해 부탁드립니다.

## 설치법

> [!NOTE]
> 해당 프로젝트는 pnpm 실행 환경을 기반으로 합니다. 만약 pnpm이 없다면 먼저 설치해주세요

#### 글로벌 pnpm 설치

```bash
npm install -g pnpm
```

#### 프로젝트 설치하기

```bash
git clone https://github.com/jo4086/ui-namic.git
cd ui-namic
git checkout rebuild

chmod +x setup-env.sh
./setup-env.sh

pnpm install
pnpm build

cd playground/vite
pnpm dev
```

## 패키지 구조

```bash
📁./packages
  📁react-ui/ # React환경의 UI 컴포넌트를 제공하는 패키지입니다.
  📁core/ # react-ui를 렌더링 하기위한 실제로 일을하는 패키지입니다. react-ui는 core패키지에 의존성을 가집니다.
  📁dev-tools/ # 개발환경에서 태그, 디스플레이, 잘못된 특수키 등을 입력시 설치만 하여도 에러를 띄워주는 유효성 검사 패키지입니다. 독립적으로 구성한 이유는 개발자가 react-ui를 사용하여 배포시에 유효성 검사 코드는 데드코드가 되는 일이 발생하여 build시 용량이 커지는 문제를 인식했기에 유효성검사의 실질적 코드는 dev-tools라는 패키지로 빼두고 설치만하면 다른 설정 없이 유효성 검사가 작동하게 만들고 있습니다.
  📁debug/ # dev-tools를 만들기 이전 이 프로젝트를 만들면서 디버깅을 하기위해 만든 패키지입니다. 프로젝트의 완성시에는 아마 사라지지 않을까 생각합니다.
```

## playground 사용하기

현재 사용할 수 있는 컴포넌트는 `Box`, `Button`, `InputField` 3개입니다.

_`packages/react-ui/src/utils/createItem.jsx`_ 를 사용하여 얼마든지 확장 할 수 있는 구조이며

현재 독립적인 컴포넌트의 이벤트 연결을 위해 리액트 돔 추적로직을 구성중입니다.

## uinamic의 사용법

-   현재 미완성이라 빌드시 사용하는 패키지명으로는 사용할 수 없습니다.
-   jsconfig.json의 별칭으로 지정한 경로를 사용해주셔야합니다.

<details>
<summary> $\textsf{\color{gray}{펼치기}}$ </summary>

```jsx
// import { Box } from '@uinamic/react-ui' // 패키지명 사용 불가
import { Box } from '@react-ui'
import { useState } from 'React'

const style = {
    backgroundColor: 'blue',

    dyClick: {
        backgroundColor: 'red',
    },
}

const Main = () => {
    const [toggle, setToggle] = useState(false)

    // 현재는 dynamicStyle이지만 추후 dy로 축약시킬 예정입니다.
    return (
        <>
            <Box dynamicStyle={style} onClick={() => setToggle((prev) => !prev)}>
                안녕하세요
            </Box>
        </>
    )
}
```

해당 코드 작동시

클릭시마다 백그라운드 컬러가 `기본값: blue`, `토글값: red`로 작동하게끔 이벤트 기반 스타일링을 쉽게 하는것이며 onClick뿐만 아니라 자주 사용되는 onEvent을 선언형으로 스타일을 만들게 하는게 목적입니다.

이벤트 스타일을 적용하고 싶은 키워드는 아래와같이 `on`을 `dy`로 교체해서 사용하면 됩니다.

-   `onClick` → `dyClick`
-   `onFocus` → `dyFocus`
-   `onBlur` → `dyBlur` ...

외부 변수로 작성해서 기본 스타일과 동적 스타일을 한번에 선언할 수있으며 간단하게 적용하고 싶을때는 아래와 같이 사용합니다.

```jsx
import { Box } from '@uinamic/react-ui'
import { useState } from 'React'

const Main = () => {
    const [toggle, setToggle] = useState(false)

    return (
        <>
            <Box style={{ color: 'green', backgroundColor: 'orange' }} dyClick={{ color: 'white', backgroundColor: 'black' }} onClick={() => setToggle((prev) => !prev)}>
                클릭시마다 dyClick에 설정한 스타일로 토글됩니다.
            </Box>
        </>
    )
}
```

단순 클릭이벤트 뿐만아니라 선언형으로 `hover`, `after`, `before`같은 **가상 클래스와 가상 요소**, `keyfraems`와 `media`까지 지원하며

이들을 중첩구조로 모든 상황에서의 이벤트 동적 스타일링을 선언형으로 하는게 목표입니다.

아래는 다양항 상황에서 모두 선언형으로 복잡한 스타일을 모두 예상했을때 작성한 코드이며 완성형이 아니기에 수정 될 여지가 있습니다.

<details>
<summary> $\textsf{\color{gray}{선언형 코드 보기}}$ </summary>

```js
const commonStyle = { one: '0.5s ease 1' }

const boxStyle4 = {
    userSelect: 'none',
    gap: '20px',
    color: 'black',
    fontSize: '20px',
    border: '1px solid black',
    outline: 0,
    // width: '500px',
    // margin: '30px auto 0 30px',
    backgroundColor: 'white',
    // justifyContent: 'end',
    // padding: '0 20px',
    boxSizing: 'border-box',
    textAlign: 'right',
    transition: [{ name: 'color, background-color', value: '0.5s ease 1' }, 'font-size 1s ease-in-out 1'],
    // cursor: 'pointer',
    // whiteSpace: 'nowrap',
    position: 'relative',
    // width: 'auto',

    keyframes: {
        move: {
            duration: '3s',
            iteration: 5,
            timingFunction: 'ease-in-out',
            percent: {
                0: { transform: 'translateX(0%)', opacity: 0, easing: 'ease-in' },
                15: { transform: 'translateX(50%)', opacity: 0.3, easing: 'ease-in-out' },
                70: { transform: 'translateX(75%)', opacity: 0.7, easing: 'linear' },
                100: { transform: 'translateX(50%)', opacity: 1, cursor: 'default', easing: 'ease-out' },
            },
        },
        scale: {
            animation: '3s 5 ease-in-out',
            percent: {
                0: { transform: 'scale(1)' },
                100: { transform: 'scale(1.5)' },
            },
        },
    },

    media: {
        between: [
            { up: 768, down: 1023, width: '200px', height: '50px' },
            { up: 1024, down: 1279, width: '300px', height: '100px' },
        ],
        down: [
            { point: 1023, width: '200px', height: '50px' },
            { point: 1279, width: '300px', height: '100px' },
            { point: 1439, width: '400px', height: '150px' },
        ],
        up: [
            { point: 768, width: '200px', height: '50px' },
            { point: 1280, width: '300px', height: '100px' },
        ],
        advanced: [{ query: 'screen, (min-width: 768px) and (max-width: 1023px)', width: '300px' }],
    },

    dyClick: {
        color: 'blue',
        backgroundColor: 'pink',
        padding: '0 200px',

        hover: {
            backgroundColor: 'red',
            color: 'white',
        },
        after: {
            position: 'absolute',
            content: '"hello"',
            left: '30px',
            top: '3px',
            fontSize: '16px',
            transition: [`left ${commonStyle.one}`, `top ${commonStyle.one}`, `fontSize ${commonStyle.one}`],
        },
        before: {
            opacity: '0',
        },
    },
}
```

</details>
</details>

## 문서 계획

### docs/

-   전체적으로 미완성이며 docs 구조만 잡아둔 상태입니다.

-   [1. 프로젝트 목표](./docs/01_Objectives.md) : 이 프로젝트가 완성될 시 어떻게 사용되는지, 최적화, 각종 이슈에 대한 목표를 기록할 문서입니다.
-   [2. 아키텍처 설명](./docs/02_Architeture.md) : 패키지들을 구성하는 전체적인 흐름과 각 파일의 역할을 정리해둘 문서입니다.
-   [3. 개발일지](./docs/03_Devlog.md) : 개발과정을 기록하는 문서입니다.
-   [4. 개발배경](./docs/04_Background.md) : 이 프로젝트를 시작하게된 계기와 탄생배경을 정리한 문서입니다.
-   [5. 브런치 커밋 전략](./docs/05_BranchStrategy.md) : 앞으로 브런치는 어떻게 구성할 것인지, 커밋 메세지의 통일화 구조에 대해서 적어둔 문서입니다.
-   [6. 반성기록](./docs/06_Reflection.md) : gpt의 도움을 통해 코드를 제작하면서 코드가 돌아가기는 하나 파악하지 못한것들을 기록하고 반성하며 분석하는 문서입니다.
-   [7. 아카이브](./docs/07_Archive.md) : 개발하면서 사용하지 않게된 함수들이나 구조가 크게 바뀌어 사용하지 않게된 이전 버전들을 모아둘 예정입니다.

### history/
