// ui/Box.js

import { createItem } from '@react-ui'
import { globalStyle } from '../theme'

export const Box = createItem({
    type: 'div',
    display: 'flex',
    baseStyle: {
        ...globalStyle,
        border: '1px solid black',
        padding: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: ' 4px',
    },
})

export default Box
