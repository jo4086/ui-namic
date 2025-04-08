// ui/Button.js

import { createItem } from '@react-ui'
import { globalStyle } from '../theme'

export const Button = createItem({
    type: 'button',
    display: 'flex',
    baseStyle: {
        ...globalStyle,
        border: '1px solid black',
        padding: '10px 20px',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: ' 8px',
        margin: '0 auto',
    },
})

export default Button
