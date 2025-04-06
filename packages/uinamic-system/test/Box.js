import createItem from 'user/createItem'
import theme from './theme'

const Box = createItem({
    type: 'div',
    display: 'flex',
    baseStyle: {
        ...theme,
        border: '1px solid black',
        padding: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: ' 4px',
    },
})

export default Box
