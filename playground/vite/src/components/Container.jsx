import { Box } from '@react-ui'

const Container = ({ children }) => {
    return (
        <Box className="container" style={{ width: '600px', padding: '30px', backgroundColor: 'cyan' }}>
            {children}
        </Box>
    )
}

export default Container
