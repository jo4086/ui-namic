import { Box, Button, InputField } from '@react-ui'
import { useRef } from 'react'
import { useState } from 'react'

const styl = {
    backgroundColor: 'cyan',
    dyClick: {
        backgroundColor: 'black',
        color: 'white',
    },
    dyFocus: {
        color: 'black',
    },
}

const Intro = () => {
    const [count, setCount] = useState(0)
    const [value, setValue] = useState('')
    const [text, setText] = useState('')

    const inputRef = useRef(null)

    return (
        <div>
            <Button onClick={() => setCount((count) => count + 1)} dyClick="font-size:2rem;" dyOrder={['onClick', 'onFocus']} dyState={{ click: 'count' }} watchValueMap={{ count }}>
                count is {count}
            </Button>
            <Button onClick={() => setCount((e) => (e = 0))}>카운트 초기화</Button>

            {/* <Box display="flex" dynamicStyle={styl} type="article" style={{ flexDirection: 'column', gap: '10px', backgroundColor: 'tan' }} dyClick={{ backgroundColor: 'blue' }}>
                <Box type="article">새로추가</Box>
                <Box>새로추가</Box>
                <Box>하이</Box>
                <Box>하이</Box>
                <Box>하이</Box>
                <Box>
                    <Box>하이</Box>
                </Box>
                <InputField value={value} onChange={(e) => setValue(e.target.value)} />
            </Box>

            <InputField ref={inputRef} />
            <Button onClick={() => inputRef.current.focus()}>포커스</Button> */}
        </div>
    )
}

export default Intro
