// @uinamic-system/styled.js

import createItem from './createItem'

const styled = (Base) => (styleFn) => {
    const Component = typeof Base === 'string' ? createItem({ type: Base }) : Base

    return function StyledComponent(props) {
        const styleFromFn = typeof styleFn === 'function' ? styleFn(props) : styleFn || {}

        const combinedStyle = {
            ...styleFromFn,
            ...props.dynamicStyle, // props 쪽이 우선
        }

        return <Component {...props} dynamicStyle={combinedStyle} />
    }
}

export default styled
