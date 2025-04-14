import { Box } from '@react-ui'

const Root = () => {
    return (
        <>
            <Box type="artee" style={{ gap: '10px' }}>
                <article style={{ padding: '20px', border: '1px solid red', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '20px 30px', borderRadius: '4px' }}>
                    <Box>아티클1</Box>
                    <Box>아티클2</Box>
                    <Box>아티클3</Box>
                    <Box>아티클4</Box>
                </article>
                {/* <secti style={{ padding: '20px', border: '1px solid blue' }}>섹션</secti>
                <secti style={{ padding: '20px', border: '1px solid green' }}>섹션</secti> */}
                <article>아티클</article>
            </Box>
            <Box>헬로박스</Box>
        </>
    )
}

export default Root
