#### 상용 정보

-   \$$typeof: Symbol(react.element) → React Element 식별
-   props:{}
    -   children: 리턴 컴포넌트문에 들어오는 요소
    -   그 외의 나머지는 인라인
-   type: 해당 컴포넌트의 HTML 태그
-   key: 리스트 렌더에서 구분하기 위한 유니크 값
-   ref: 컴포넌트 또는 DOM노드 참조용

#### 개발용 META 정보

-   \_owner: FiberNode
-   \_store

| 구조                    | 설명                                                   |
| ----------------------- | ------------------------------------------------------ |
| $$typeof                | React 엘리먼트 식별자                                  |
| type                    | 함수형 컴포넌트 또는 HTML 태그                         |
| props                   | children 포함 모든 prop 값                             |
| \_owner                 | 이 엘리먼트를 생성한 컴포넌트의 Fiber                  |
| [[Scopes]]              | 현재 함수의 클로저 상태 추적                           |
| Closure (호출된 함수명) | HOC 또는 factory 함수에서 캡처한 데이터                |
| Module                  | 호출된 함수명에서 import된 유틸 함수, 컴포넌트 등 포함 |
| generateRenderData\_\*  | 렌더링 로직을 캡슐화한 핵심 함수 – 이 구조의 출발점    |

#### 함수컴포넌트의 구조 파악

```jsx
import { Box, Button, InputField } from '@react-ui'
import { useRef } from 'react'
import { useState } from 'react'

const Intro = () => {
    const [value, setValue] = useState('')
    const [text, setText] = useState('')

    const inputRef = useRef(null)

    console.log(inputRef)

    console.log(
        <>
            <Box type="article" style={{ gap: '10px' }}>
                <InputField ref={inputRef} />
                <Button onClick={() => inputRef.current.focus()}>포커스</Button>
            </Box>
        </>
    )
}
export default Intro
```

### console.log(<>\<Box>...\</Box></>)

```js
{
    $$typeof: Symbol(react.transitional.element),
    type: Symbol(react.fragment),
    key: null,
    props: {},
    _owner: FiberNode {tag: 0, key: null, stateNode: null, elementType: ƒ, type: ƒ, …},
    _store: {validated: 0},
    ref: null,
    _debugInfo: null,
    _debugStack: Error: react-stack-top-frame at exports.jsxDev (http://localhost:5173/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=cd9e1471:247:30) at Intro (http://localhost:5173/src/pages/Intro.jsx?t=1744976550241:28:21) at react-stack-bottom-frame (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=cd9e1471:17422:20) at renderWithHooks (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=cd9e1471:4204:24) at updateFunctionComponent (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=cd9e1471:6617:21) at beginWork (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=cd9e1471:7652:20) at runWithFiberInDEV (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=cd9e1471:1483:72) at performUnitOfWork (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=cd9e1471:10866:98) at workLoopSync (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=cd9e1471:10726:43) at renderRootSync (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=cd9e1471:10709:13),
    _debugTask: {run: ƒ}
},

```

### 위에서 \_owner 정보

```js
{
    actualDuration: 10.700000002980232,
    actualStartTime: 176.29999999701977,
    alternate: null,
    child: FiberNode {tag: 0, key: null, stateNode: null, elementType: ƒ, type: ƒ, …},
    childLanes: 0,
    deletions: null,
    dependencies: null,
    elementType: () => {…},
    flags: 1,
    index: 0,
    key: null,
    lanes: 0,
    memoizedProps: {},
    memoizedState: {memoizedState: '', baseState: '', baseQueue: null, queue: {…}, next: {…}},
    mode: 3,
    pendingProps: {},
    ref: null,
    refCleanup: null,
    return: FiberNode {tag: 10, key: null, elementType: {…}, type: {…}, stateNode: null, …},
    selfBaseDuration: 1.3999999985098839,
    sibling: null,
    stateNode: null,
    subtreeFlags: 13634049,
    tag: 0,
    treeBaseDuration: 7.800000004470348,
    type: () => {…},
    updateQueue: null,
    _debugHookTypes: (3) ['useState', 'useState', 'useRef'],
    _debugInfo: null,
    _debugNeedsRemount: false,
    _debugOwner: FiberNode {tag: 0, key: null, stateNode: null, elementType: ƒ, type: ƒ, …},
    _debugStack: Error: react-stack-top-frame at exports.jsxDEV (http://localhost:5173/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=cd9e1471:247:30) at App (http://localhost:5173/src/App.jsx?t=1744976550241:31:73) at react-stack-bottom-frame (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=cd9e1471:17422:20) at renderWithHooks (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=cd9e1471:4204:24) at updateFunctionComponent (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=cd9e1471:6617:21) at beginWork (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=cd9e1471:7652:20) at runWithFiberInDEV (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=cd9e1471:1483:72) at performUnitOfWork (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=cd9e1471:10866:98) at workLoopSync (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=cd9e1471:10726:43) at renderRootSync (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=cd9e1471:10709:13),
    _debugTask: {run: ƒ},
    [[Prototype]]: Object
}
```

### 함수형 컴포넌트의 [[Scopes]]

1. Closure: 해당 함수 실행 당시 스코프
2. Module: ES 모듈 범위
    - import된 함수, 컴포넌트, 모듈 캐시 등 포함
    - Box, Button, useState, Framgent, jsxDev 등 존재
3. Global: 아마 css속성들이나 이벤트 데이터패치 등에 관한게 들어있는것으로 보인다

이때 Module에서 Box로 가서 다시 Scopes를 보게되면
이 다시

1. `Closure (createItem)`: Box가 생성된 위치는 `createItem`이고 호출된 함수는 내가 정의한 함수가 들어있으며 아래와 같다

```js
0: Closure (createItem)
  getRenderData: f GeneratedComponent({children, type, display...})
  ▶[[Prototype]]: Object
```

2. `Module`: Box를 만든곳인 `createItem`의 import된 정보들 가지고있으며 아래와 같다

```js
▼[[Scopes]]: Scopes[3]
  ▼ 0: Closure (Intro)
    ▶InputRef: {current: input.Test_InputField_23a0a5a2}
    ▶setValue: f ()
    ▶[[Prototype]]: Object
  ▼ 1: Module
    ▼ Box: f Component(props)
        length: 1
        name: "Component"
      ▶[[Prototype]]: {}
        arguments: (...)
        caller: (...)
        [[FunctionLocation]]: createItem.jsx: 11
      ▶[[Prototype]]: f ()
      ▼ [[Scopes]]: Scopes[3]
        ▼ 0: Closure (createItem)
          ▶getRenderData:
          ▶[[Prototype]]: Object
      ▼ 1: Module
        ▶generateRenderData: ({ type: defaultType = 'div', display: defaultDisplay = 'block', dynamicType: defaultDynamicType = undefined, baseStyle: defaultBaseStyle = {} } = {}) => {…}
        ▶generateRenderData_v2: ({ type: defaultType = 'div', display: defaultDisplay = 'block', dynamicType: defaultDynamicType = undefined, baseStyle: defaultBaseStyle = {} } = {}) => {…}
        ▶generateRenderData_v3: ({ itemName, type: defaultType = 'div', display: defaultDisplay = 'block', dynamicType: defaultDynamicType = undefined, baseStyle: defaultBaseStyle = {} } = {}) => {…}
        ▶jsxDev: f (type, config, maybeKey, isStaticChildren, sourcee, self)
        ▶logGroup: f logGroup(label = "")
        ▶logStyle: f logStyle(label, value, background, fontSize, isOpen)
        ▶_vite_cjsImport0_react_jsxDevRuntime: {Fragment: Symbol(react.fragment), jsxDEV: ƒ}
        ▶[[Prototype]]:Object
      ▶ 2: Global {window: Window, self: Window, document: document, name: '', ...}

```
