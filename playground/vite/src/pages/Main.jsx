import { Box } from '@react-ui'
import Container from '../components/Container'

const Main = () => {
    return (
        <Box>
            <Box style={{ flexDirection: 'column', padding: '10px' }}>
                <Container>
                    <Box dyClick="font-size:2rem;"></Box>
                    <Box></Box>
                </Container>
            </Box>
        </Box>
    )
}
export default Main
