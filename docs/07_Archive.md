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


import * as a from '../customStyled'

const Button = ({ onClick, children, padding, paddingTop, paddingBottom, paddingLeft, paddingRight, paddingSide, paddingVertical, width, boxShadow, height, style, margin, userSelect, ...props }) => {
    return (
        <a.Button
            onClick={onClick}
            $padding={padding}
            $paddingTop={paddingTop}
            $paddingBottom={paddingBottom}
            $paddingLeft={paddingLeft}
            $paddingRight={paddingRight}
            $paddingSide={paddingSide}
            $paddingVertical={paddingVertical}
            $width={width}
            $height={height}
            $boxShadow={boxShadow}
            $margin={margin}
            $userSelect={userSelect}
            style={style}
            {...props}>
            {children}
        </a.Button>
    )
}
export default Button

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
    user-select: ${(props) => props.$userSelect || 'none'};
    height: ${(props) => props.$height || 'none'};
    margin: ${(props) => props.$margin || '0 auto'};
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
   z-index: 9999;
   width: 100%;
   height: ${(props) => props.$height || 'auto'};
   justify-content: space-between;
   max-width: 1080px;
   left: max(0px, calc((100% - 1080px) / 2));
   right: max(0px, calc((100% - 1080px) / 2));
   padding: 0 10px 0 0;
   top: 0px;
   // border: 1px solid black;
   display: flex;
   // background-color: #bdd;
   align-items: center;
   user-select: none;
`



export const Divider = styled.div`
    // padding: 0px;
    display: flex;
    // align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 1px;
    height: 50%;
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
    width: ${(props) => props.$width || 'auto'};
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

export const TextField = styled.div`
    box-sizing: border-box;
    background-color: orange;

    input,
    textarea {
        outline: ${(props) => props.$outline || 'none'};
        display: ${(props) => props.$display || 'block'};
        padding: ${(props) => calculatePadding(props)};
        margin: ${(props) => `${calculateMargin(props)}`};
        width: ${(props) => props.$width || 'auto'};
        height: ${(props) => props.$height || 'auto'};
        ${(props) => props.$backgroundColor && `background-color: ${props.$backgroundColor};`}
        ${(props) => props.$border && `border: ${props.$border};`}
        ${(props) => props.$textAlign && `text-align: ${props.$textAlign};`}
        ${(props) => props.$borderRadius && `border-radius: ${props.$borderRadius};`}
        ${(props) => props.$boxShadow && `box-shadow: ${props.$boxShadow};`}
        ${(props) => props.$lineHeight && `line-height: ${props.$lineHeight};`}
        ${(props) => props.$letterSpacing && `letter-spacing: ${props.$letterSpacing};`}
        ${(props) => props.$color && `color: ${props.$color};`}
        ${(props) => props.$fontSize && `font-size: ${props.$fontSize};`}
        ${(props) => props.$fontWeight && `font-weight: ${props.$fontWeight};`}

    
        &:focus {
            // border-color: ${(props) => props.$focusBorderColor || '#4caf50'};
            box-shadow: ${(props) => props.$focusBoxShadow || '0 0 1px rgba(0, 0, 0, 0.5)'};
        }
    }

    textarea {
        resize: ${(props) => (props.$resize ? props.$resize : 'none')};
    }
`

export const InputContainer = styled.div`
    box-sizing: border-box;
    margin: ${(props) => props.$margin || '0 auto'};
    // margin: ${(props) => calculateMargin(props)};
    padding: ${(props) => calculatePadding(props)};
    width: ${(props) => props.$width || '100%'};
    flex-grow: ${(props) => props.$flexGrow || '1'};
    display: ${(props) => props.$display || 'block'};
    background-color: ${(props) => props.$backgroundColor || 'transparent'};
    border: ${(props) => props.$border || 'none'};
    border-radius: ${(props) => props.$borderRadius || '4px'};
    box-shadow: ${(props) => props.$boxShadow || 'none'};

    label {
        display: block;
        margin-bottom: ${(props) => props.$labelMarginBottom || '8px'};
        font-size: ${(props) => props.$labelFontSize || '14px'};
        color: ${(props) => props.$labelColor || '#555'};
    }

    input,
    textarea {
        width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
        padding: ${(props) => calculatePadding(props)};
        border: ${(props) => props.$inputBorder || '1px solid #ccc'};
        border-radius: ${(props) => props.$inputBorderRadius || '4px'};
        font-size: ${(props) => props.$fontSize || '16px'};
        outline: none;
        box-sizing: border-box;
        background-color: ${(props) => props.$inputBackgroundColor || '#fff'};

        &:focus {
            border-color: ${(props) => props.$focusBorderColor || '#4caf50'};
            box-shadow: ${(props) => props.$focusBoxShadow || '0 0 5px rgba(0, 0, 0, 0.1)'};
        }

        &:hover {
            background-color: ${(props) => props.$hoverBackgroundColor || '#f9f9f9'};
        }
    }

    textarea {
        resize: ${(props) => (props.$resize ? props.$resize : 'none')};
        min-height: ${(props) => (props.$rows ? `${props.$rows * 24}px` : '80px')};
    }
`