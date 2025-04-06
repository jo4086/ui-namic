// ui/Input.js

import { createItem } from '@uinamic/react'
import { globalStyle } from '../theme'

const Input = createItem({
    type: 'input',
    display: 'flex',
    baseStyle: {
        ...globalStyle,
        border: '1px solid black',
        padding: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: ' 4px',
        fontSize: '1.5rem',
        padding: '10px 5px',
    },
})

export default Input
