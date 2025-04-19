## 개요

나는 리액트를 배우면서 MUI같은 컴포넌트를 styled-components를 적응 이용하여 나만의 스타일링 컴포넌트를 만들고 싶었다.

아래는 개발학원에서 첫 리액트 개인 프로젝트를 하면서 처음 탄생한 나의 코드다

## 초기모델

처음으로 만들게된 코드로 직접 props로 속성을 하나하나 지정해줬었다

<details>
<summary> 1. 초기 코드 </summary>

-   초기에 스타일드 컴포넌트를 이용하여 정의한 코드
     <details>
     <summary> customStyled.js </summary>

    ```js
    import styled from 'styled-components'

    export const calculatePadding = (props) => {
        if (props.$padding) {
            return props.$padding
        }

        const paddingTop = props.$paddingTop || props.$paddingVertical || '0px'
        const paddingRight = props.$paddingRight || props.$paddingSide || '0px'
        const paddingBottom = props.$paddingBottom || props.$paddingVertical || '0px'
        const paddingLeft = props.$paddingLeft || props.$paddingSide || '0px'

        return `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`
    }

    export const calculateMargin = (props) => {
        if (props.$margin) {
            return props.$margin
        }

        const marginTop = props.$marginTop || props.$paddingVertical || '0px'
        const marginRight = props.$marginRight || props.$paddingSide || '0px'
        const marginBottom = props.$marginBottom || props.$paddingVertical || '0px'
        const marginLeft = props.$marginLeft || props.$paddingSide || '0px'

        return `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`
    }

    export const Box = styled.div`
        box-sizing: border-box;
        display: ${(props) => props.$model || 'block'}; /* 기본값 block */
        gap: ${(props) => props.$gap || '0'};
        justify-content: ${(props) => props.$justify || 'flex-start'};
        align-items: ${(props) => props.$align || 'stretch'};
        flex-direction: ${(props) => (props.$model === 'flex' ? props.$direction || 'row' : 'unset')};

        background-color: ${(props) => props.$backgroundColor || 'transparent'};
        grid-template-columns: ${(props) => (props.$model === 'grid' ? props.$columns || 'repeat(3, 1fr)' : 'none')};
        grid-template-rows: ${(props) => (props.$model === 'grid' ? props.$rows || 'auto' : 'none')};
        width: 100%;
        max-width: ${(props) => props.$maxWidth || 'none'};
        padding: ${(props) => props.$padding || '0'};
        margin: ${(props) => props.$margin || '0 auto'};
        aspect-ratio: ${(props) => props.$aspectRatio || 'initial'}; // 추가
        border-radius: ${(props) => props.$borderRadius || 'initial'}; // 추가
        border: ${(props) => props.$border || '1px solid rgba(0,0,0,0.3)'}; // 추가
    `

    export const Nav = styled.nav`
        position: fixed;
        box-sizing: border-box;
        width: 100%;
        height: ${(props) => props.$height || 'auto'};
        justify-content: space-between;
        max-width: 1080px;
        left: calc((100% - 1080px) / 2);
        right: calc((100% - 1080px) / 2);
        padding: 0 10px 0 0;
        top: 0px;
        border: 1px solid black;
        display: flex;
        background-color: #bdd;
        align-items: center;
    `

    export const Button = styled.button`
        width: ${(props) => props.$width || 'auto'};
        display: block;
        background-color: #ffffff;
        box-sizing: border-box;
        text-align: center;
        font-size: 0.7rem;
        letter-spacing: 1.1px;
        font-family: 'Open Sans', sans-serif;
        font-weight: 500;
        color: #222222;
        border: none;
        border-radius: 3px;
        text-decoration: none;
        // box-shadow: #000000;
        box-shadow: ${(props) => (props.$boxShadow ? '0 0 1px 0.5px rgba(0, 0, 0,0.8)' : 'none')};
        padding: ${(props) => {
            // 가장 우선적으로 padding을 체크
            if (props.padding) {
                return props.$padding
            }

            // Vertical & Side 값 적용
            const paddingTop = props.$paddingTop || props.$paddingVertical || '3px'
            const paddingRight = props.$paddingRight || props.$paddingSide || '8px'
            const paddingBottom = props.$paddingBottom || props.$paddingVertical || '3px'
            const paddingLeft = props.$paddingLeft || props.$paddingSide || '8px'

            // 최종 padding 값 반환
            return `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`
        }};

        &:hover {
            background-color: #efefef;
            color: black;
            cursor: pointer;
        }
    `

    export const Divider = styled.div`
        // padding: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 1px;
        height: 80%;
        background-color: black;
        margin: auto 3px;
        color: #333;
    `

    export const Li = styled.li`
        list-style: none;
        display: ${(props) => props.$display || 'flex'};
        justify-content: ${(props) => props.$justifyContent || 'center'};
        align-items: ${(props) => props.$alignItems || 'center'};
        width: ${(props) => props.$width || 'auto'};
        margin: ${(props) => props.$margin || '0 auto'};
        height: ${(props) => props.$height || 'auto'};
        box-sizing: ${(props) => props.$boxSizing || 'border-box'};

        ${(props) => props.$flexDirection && `flex-direction: ${props.$flexDirection};`}
        ${(props) => props.$gap && `gap: ${props.$gap};`}
        ${(props) => props.$gridTemplateColumns && `grid-template-columns: ${props.$gridTemplateColumns};`}
        ${(props) => props.$gridTemplateRows && `grid-template-rows: ${props.$gridTemplateRows};`}
        ${(props) => props.$lineHeight && `line-height: ${props.$lineHeight};`}
        ${(props) => props.$backgroundColor && `background-color: ${props.$backgroundColor};`}
        ${(props) => props.$border && `border: ${props.$border};`}
        ${(props) => props.$borderRadius && `border-radius: ${props.$borderRadius};`}
        ${(props) => props.$boxShadow && `box-shadow: ${props.$boxShadow};`}
        ${(props) => props.$height && `height: ${props.$height};`}
        
        
        padding: ${(props) => calculatePadding(props)};
    `

    export const Container = styled.div`
        box-sizing: border-box;
        display: ${(props) => props.$display || 'flex'};
        width: ${(props) => props.$width || '1080px'};
        height: ${(props) => props.$height || 'auto'};
        margin: ${(props) => props.$margin || '0 auto'};
        max-width: ${(props) => props.$maxWidth || 'none'};
        justify-content: ${(props) => props.$justifyContent || 'center'};
        align-items: ${(props) => props.$alignItems || 'center'};

        ${(props) => props.$flexDirection && `flex-direction: ${props.$flexDirection};`}
        ${(props) => props.$gap && `gap: ${props.$gap};`}
        ${(props) => props.$gridTemplateColumns && `grid-template-columns: ${props.$gridTemplateColumns};`}
        ${(props) => props.$gridTemplateRows && `grid-template-rows: ${props.$gridTemplateRows};`}
        ${(props) => props.$lineHeight && `line-height: ${props.$lineHeight};`}
        ${(props) => props.$backgroundColor && `background-color: ${props.$backgroundColor};`}
        ${(props) => props.$border && `border: ${props.$border};`}
        ${(props) => props.$borderRadius && `border-radius: ${props.$borderRadius};`}
        ${(props) => props.$boxShadow && `box-shadow: ${props.$boxShadow};`}
        ${(props) => props.$height && `height: ${props.$height};`}
        flex-grow: ${(props) => props.$flexGrow || '0'}
        // ${(props) => props.$flexGrow && `flex-grow: ${props.$flexGrow};`}
    
    
        padding: ${(props) => calculatePadding(props)};
        margin: ${(props) => `${calculateMargin(props)}`};
        // margin: ${(props) => props.$margin || '0 auto'};
    `
    ```

     </details>

<!-- $\textit{\color{gray}{\small{\textsf{Box.jsx}}}}$ -->

-   초기 컴포넌트
     <details>
     <summary> $\textit{\color{gray}{\small{\textsf{Box.jsx}}}}$ </summary>

    ```jsx
    import * as a from '../customStyled'

    const Box = ({ model, gap, justify, align, direction, columns, rows, children, style, ...props }) => {
        // $ 접두어가 필요한 props 목록
        const styledPropsKeys = ['padding', 'margin', 'gap', 'columns', 'rows', 'backgroundColor', 'aspectRatio', 'borderRadius', 'border', 'maxWidth']

        // styled-components 전용 props로 리매핑
        const styledProps = Object.keys(props).reduce((acc, key) => {
            if (styledPropsKeys.includes(key)) {
                acc[`$${key}`] = props[key] // $ 접두어 추가
            }
            return acc
        }, {})

        return (
            <a.Box $model={model} $gap={gap} $justify={justify} $align={align} $direction={direction} $columns={columns} $rows={rows} {...styledProps} style={style}>
                {children}
            </a.Box>
        )
    }
    export default Box
    ```

     </details>

</details>

---

이는 새로운 컴포넌트가 추가되거나 다양한 props를 추가 할 때마다 수동으로 입력해줘야했기에 효율성에 의문을 가지기 시작하였고 처음으로 속성을 필터하는 자동화 유틸을 생각하는 계기가 되었다.

<details>
<summary> 2. 초기 자동화 개선코드 </summary>

첫 유효성 검증 및 자동화를 구현한 코드

> <details>
> <summary> utils.js (filterPropsByLayout) </summary>
>
> ```js
> export const flexPropsKeys = [
>     'display', // 반드시 'flex'여야 유효
>     'flexDirection',
>     'justifyContent',
>     'alignItems',
>     'gap',
>     // 'flexGrow'
> ]
> // ;('')
> // 그리드 박스 관련 속성
> export const gridPropsKeys = [
>     'display', // 반드시 'grid'여야 유효
>     'gridTemplateColumns',
>     'gridTemplateRows',
>     'gridGap',
>     'alignItems',
>     'justifyContent',
> ]
>
> // 텍스트 관련 속성
> export const textPropsKeys = [
>     'textAlign', // 텍스트
>     'lineHeight',
>     'letterSpacing',
>     'color',
>     'fontSize',
>     'fontWeight',
> ]
>
> // 공통 속성
> export const commonPropsKeys = [
>     'padding', // 공통속성
>     'paddingLeft',
>     'paddingRight',
>     'paddingTop',
>     'paddingBottom',
>     'paddingSide',
>     'paddingVertical',
>     'margin',
>     'marginTop',
>     'marginRight',
>     'marginBottom',
>     'marginLeft',
>     'marginVertical',
>     'marginSide',
>     'backgroundColor',
>     'border',
>     'borderRadius',
>     'boxShadow',
>     'width',
>     'height',
>     'maxWidth',
>     'minWidth',
>     'maxHeight',
>     'minHeight',
>     'aspectRatio',
>     'boxSizing',
>     'flexGrow',
> ]
>
> const filterPropsByLayout = (props, display) => {
>     // 레이아웃별 유효한 키
>     const layoutKeys = {
>         flex: [...flexPropsKeys, ...commonPropsKeys],
>         grid: [...gridPropsKeys, ...commonPropsKeys],
>         text: [...textPropsKeys, ...commonPropsKeys],
>     }
>
>     const validKeys = layoutKeys[display] || commonPropsKeys // layout이 없으면 공통 속성만
>
>     // 유효한 키만 필터링
>     return Object.keys(props).reduce((acc, key) => {
>         if (validKeys.includes(key)) {
>             acc[`$${key}`] = props[key] // $ 접두어 추가
>         }
>         return acc
>     }, {})
> }
>
> export default filterPropsByLayout
> ```
>
> </details>

자동 필터 로직을 탑재한 첫 컴포넌트

> <details>
> <summary> Container.jsx </summary>
>
> ```jsx
> import * as a from '../customStyled'
> import filterPropsByLayout from './utils'
>
> const Container = ({ display, children, style, ...props }) => {
>     const styledProps = filterPropsByLayout(props, display)
>     return (
>         <a.Container style={style} {...styledProps}>
>             {children}
>         </a.Container>
>     )
> }
>
> export default Container
> ```
>
> </details>

</details>

---

그러나 여전히 **customStyled.js**에는 수동으로 매번 속성을

_`color: ${(props) => props.$color || 'black'};`_

같이 추가해야함에 답답함을 느끼고 이것도 자동화가 필요하다는것을 깨달았다

<details>
<summary> 3. 초기 style자동화 코드 </summary>

> <details>
> <summary> autoStylesProps.js </summary>
>
> ```js
> const autoStylesProps = (props) => {
>     return Object.entries(props)
>         .map(([key, value]) => {
>             if (key.startsWith('$')) {
>                 // $ 접두어 확인
>                 const cssKey = key
>                     .slice(1) // $ 제거
>                     .replace(/([A-Z])/g, '-$1') // camelCase -> kebab-case
>                     .toLowerCase()
>                 // console.log(`CSS Key: ${cssKey}, Value: ${value}`)
>                 console.log(`"${cssKey}: ${value};"`)
>                 return `${cssKey}: ${value};` // CSS 문자열 생성
>             }
>             return '' // $ 접두어 없으면 무시
>         })
>         .join('\n') // 문자열 합치기
> }
>
> export default autoStylesProps
> ```
>
> </details>

<details>
<summary> autoSylesProps.js를 적용한 cumtomStyled.js 코드 </summary>

```js
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { autoStylesProps, calcMargin, calcPadding } from '../util'

export const TextField = styled.div`
    position: relative;
    display: flex;
    // flex-direction:column;
    box-sizing: border-box;
    // background-color: orange;
    // border: 1px solid white;

    justify-content: center;
    align-items: center;
    // width: 100%;

    label {
        position: absolute;
        left: 15px;
        top: 20px; /* 초기 위치 */
        width: auto;
        // flex-grow: 1;
        box-sizing: border-box;
        text-align: center;
        display: block;
        pointer-events: none;
        transition: 0.2s ease all;
        // margin-bottom: ${(props) => props.$labelMarginBottom || '8px'};
        font-size: ${(props) => props.$labelFontSize || '14px'};
        color: ${(props) => props.$labelColor || 'black'};
        // border: 1px solid black;
    }

    input,
    textarea {
        // flex-grow: 1;
        ${(props) => autoStylesProps(props)}
        outline: ${(props) => props.$outline || 'none'};
        display: ${(props) => props.$display || 'block'};
        padding: ${(props) => calcPadding(props)};
        margin: ${(props) => calcMargin(props)};
        width: ${(props) => props.$width || 'auto'};
        height: ${(props) => props.$height || 'auto'};

        box-sizing: border-box;
        &:focus {
            // border-color: ${(props) => props.$focusBorderColor || '#4caf50'};
            // box-shadow: ${(props) => props.$focusBoxShadow || '0 0 0px 0px rgba(0, 0, 0, 0.2)'};
        }
    }

    textarea {
        resize: ${(props) => (props.$resize ? props.$resize : 'none')};
    }
    label.active {
        top: 7px;
        left: 15px;
        font-size: 10px;
        color: #4caf50;
    }
    input:focus + label {
        top: 7px;
        left: 15px;
        font-size: 10px;
        color: #4caf50;
    }
`
export const Container = styled.div`
    box-sizing: border-box;
    
    ${(props) => autoStylesProps(props)}
    margin: ${(props) => calcMargin(props)};

    flex-grow: ${(props) => props.$flexGrow || '0'}
    width: ${(props) => props.$width || 'auto'};
    height: ${(props) => props.$height || 'auto'};
    max-width: ${(props) => props.$maxWidth || 'none'};
    justify-content: ${(props) => props.$justifyContent || 'center'};
    align-items: ${(props) => props.$alignItems || 'center'};

    padding: ${(props) => calcPadding(props)};
    // margin: ${(props) => calcMargin(props)};
`
export const Text = styled.p`
    ${(props) => autoStylesProps(props)}
`

export const Box = styled.div`
    box-sizing: border-box;
    display: ${(props) => props.$display || 'block'};
    ${(props) => autoStylesProps(props)}
    padding: ${(props) => calcPadding(props)};
    margin: ${(props) => calcMargin(props)};
`
// export const HyperLink = styled.span`
//     ${(props) => autoStylesProps(props)}
// `

export const HyperLink = styled(Link)`
    ${(props) => autoStylesProps(props)}
    transition: color 0.3s ease;
    padding: ${(props) => calcPadding(props)};
    margin: ${(props) => calcMargin(props)};

    &:hover {
        color: ${(props) => props.$hoverColor || props.$color || 'blue'};
    }
    //
`
export const Button = styled.button`
    ${(props) => autoStylesProps(props)}
    padding: ${(props) => calcPadding(props)};
    margin: ${(props) => calcMargin(props)};
    cursor: pointer;
`
```

</details>

> <details>
> <summary> 두가지 모두 적용한 Box.jsx 컴포넌트 </summary>
>
> ```js
> import { propsFilter } from './util'
> import * as a from './styles/customStyled'
>
> const Box = ({ display = 'flex', children, style, ...props }) => {
>     const styledProps = propsFilter(props, display)
>
>     console.log(styledProps)
>     return (
>         <>
>             <a.Box $display={display} style={style} {...styledProps}>
>                 {children}
>             </a.Box>
>         </>
>     )
> }
> export default Box
> ```
>
> </details>

</details>

---
