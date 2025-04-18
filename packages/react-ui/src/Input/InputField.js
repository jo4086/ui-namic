// ui/Input.js

import { createItem } from '@react-ui'
import { globalStyle } from '../theme'

export const InputField = createItem({
    itemName: 'InputField', // 생성할 함수형 컴포넌트의 원래 이름 메타값으로 넘기는거 추가
    type: 'input',
    display: 'flex',
    baseStyle: {
        ...globalStyle,
        border: '1px solid black',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: ' 4px',
        fontSize: '1.5rem',
        padding: '10px 5px',
    },
})

export default InputField
