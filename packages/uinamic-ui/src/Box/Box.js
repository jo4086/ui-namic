// ui/Box.js

import { createItem } from '@uinamic/system'
import { globalStyle } from '@theme'

const Box = createItem({
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
