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
    const [value, setValue] = useState('')
    const [text, setText] = useState('')

    const inputRef = useRef(null)

    return (
        <>
            <Box dynamicStyle={styl} type="article" style={{ gap: '10px', backgroundColor: 'tan' }} dyClick={{ backgroundColor: 'blue' }}>
                {/* <article style={{ padding: '20px', border: '1px solid red', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '20px 30px', borderRadius: '4px' }}>
                    <Box>아티클2</Box>
                    <Box>아티클3</Box>
                    <Box>아티클4</Box>
                </article>
                <article>아티클</article> */}
                <Box>새로추가</Box>
                <Box>하이</Box>
                <Box>
                    <Box>하이</Box>
                </Box>
                <InputField value={value} onChange={(e) => setValue(e.target.value)} />
            </Box>

            <InputField ref={inputRef} />
            <Button onClick={() => inputRef.current.focus()}>포커스</Button>
            {/* <Box>헬로박스</Box>
            <Button />
            <Box>
                <Button />
            </Box> */}
        </>
    )
}

export default Intro
