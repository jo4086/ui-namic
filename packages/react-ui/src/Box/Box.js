// ui/Box.js

// import { createItem } from '../utils'
import { createItem } from '@react-ui'
import { globalStyle } from '../theme'

export const Box = createItem({
    itemName: 'Box', // 생성할 함수형 컴포넌트의 원래 이름 메타값으로 넘기는거 추가
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
