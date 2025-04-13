import { Box, Button } from '@react-ui'
import Container from '../components/Container'
import { useState } from 'react'

const Main = () => {
    const [count, setCount] = useState(0)

    return (
        <Box>
            <Box style={{ flexDirection: 'column', padding: '10px' }}>
                <Container>
                    {/* <Box dyClick="font-size:2rem;" dyOrder={['onClick']}></Box> */}
                    {/* <Box dynamicStyle={{ fontSize: '2rem', click: { fontSize: '1rem' } }}></Box> */}
                    <Button onClick={() => setCount((count) => count + 1)} dyClick="font-size:2rem;" dyOrder={['onClick', 'onFocus']} dyState={{ onClick: 'count', onFocus: 'on' }} watchValueMap={{ count }}>
                        count is {count}
                    </Button>
                    <Button onClick={() => setCount((count) => (count = 0))}>카운트 초기화</Button>
                </Container>
            </Box>
            <Box>
                <Box></Box>
            </Box>
            <div></div>
            안녕
        </Box>
    )
}
export default Main

