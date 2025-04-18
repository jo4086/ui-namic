import { Box, Button } from '@react-ui'
import Container from '../components/Container'
import { useState } from 'react'

const Node = () => {
    // const [count, setCount] = useState(0)

    return (
        <div className="stateNode">
            <Box style={{ flexDirection: 'column', padding: '10px' }}>
                <Container>
                    {/* <Box dyClick="font-size:2rem;" dyOrder={['onClick']}></Box> */}
                    {/* <Box dynamicStyle={{ fontSize: '2rem', click: { fontSize: '1rem' } }}></Box> */}
                    {/* <Button onClick={() => setCount((count) => count + 1)} dyClick="font-size:2rem;" dyOrder={['onClick', 'onFocus']} dyState={{ onClick: 'count', onFocus: 'on' }} watchValueMap={{ count }}>
                        count is {count}
                    </Button>
                    <Button onClick={() => setCount((count) => (count = 0))}>zzzz</Button> */}
                </Container>
            </Box>
            <Box>
                d<Box>d</Box>
            </Box>
            <div></div>
            안녕
        </div>
    )
}
export default Node
