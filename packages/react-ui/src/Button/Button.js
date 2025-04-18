// ui/Button.js

import { createItem } from '@react-ui'
import { globalStyle } from '../theme'

export const Button = createItem({
    itemName: 'Button', // 생성할 함수형 컴포넌트의 원래 이름 메타값으로 넘기는거 추가
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
