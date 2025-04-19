import { Box, Button } from '@react-ui'
import Container from '../components/Container'
import { useState } from 'react'
import { Children } from 'react'

const self = <Box />

console.log('self:', self)

const Main = () => {
    const [count, setCount] = useState(0)
    const [count2, setCount2] = useState(0)
    const [count3, setCount3] = useState(0)
    const [count10, setCount10] = useState(0)

    console.log(
        '📦 onClick return\n',
        (
            <Button onClick={() => setCount10((count) => count + 1)} dyClick="font-size:2rem;" dyOrder={['onClick', 'onFocus']} dyState={{ onClick: 'count', onFocus: 'on' }} watchValueMap={{ count10 }}>
                // count is {count10}
                //{' '}
            </Button>
        ).props.onClick,
        '\n',
        <Button onClick={() => setCount10((count4) => count4 + 1)} dyClick="font-size:2rem;" dyOrder={['onClick', 'onFocus']} dyState={{ onClick: 'count', onFocus: 'on' }} watchValueMap={{ count10 }}>
            // count is {count10}
            //{' '}
        </Button>,
        '\n',
        (<Button onClick={() => setCount10((e) => (e = 0))}>카운트 초기화</Button>).props.onClick
    )

    // console.log(
    //     '📦 onClick return\n',
    //     <Box style={{ padding: '30px' }}>
    //         <Box>
    //             <Button onClick={() => setCount10((count) => count + 1)} dyClick="font-size:2rem;" dyOrder={['onClick', 'onFocus']} dyState={{ onClick: 'count', onFocus: 'on' }} watchValueMap={{ count10 }}>
    //                 count is {count10}
    //             </Button>
    //             <Button onClick={() => setCount10((e) => (e = 0))}>카운트 초기화</Button>
    //         </Box>
    //         <Box>
    //             <Button onClick={() => setCount2((count) => count + 2)} dyClick="font-size:2rem;" dyOrder={['onClick', 'onFocus']} dyState={{ onClick: 'count', onFocus: 'on' }} watchValueMap={{ count2 }}>
    //                 count is {count2}
    //             </Button>
    //             <Button onClick={() => setCount2((e) => (e = 0))}>카운트 초기화</Button>
    //         </Box>
    //         <Box>
    //             <Button onClick={() => setCount3((count) => count + 3)} dyClick="font-size:2rem;" dyOrder={['onClick', 'onFocus']} dyState={{ onClick: 'count', onFocus: 'on' }} watchValueMap={{ count3 }}>
    //                 count is {count3}
    //             </Button>
    //             <Button onClick={() => setCount3((e) => (e = 0))}>카운트 초기화</Button>
    //         </Box>
    //     </Box>
    // )

    return (
        <Box style={{ padding: '30px' }}>
            <Box>
                <Button onClick={() => setCount((count) => count + 1)} dyClick="font-size:2rem;" dyOrder={['onClick', 'onFocus']} dyState={{ click: 'count' }} watchValueMap={{ count }}>
                    count is {count}
                </Button>
                <Button onClick={() => setCount((e) => (e = 0))}>
                    카운트 초기화
                </Button>
            </Box>
            <Box>
                <Button onClick={() => setCount2((count) => count + 2)} dyClick="font-size:2rem;" dyOrder={['onClick', 'onFocus']} dyState={{ click: 'count' }} watchValueMap={{ count2 }}>
                    count is {count2}
                </Button>
                <Button onClick={() => setCount2((e) => (e = 0))}>
                    카운트 초기화
                </Button>
            </Box>
            {/* <Box>
                <Button onClick={() => setCount3((count) => count + 3)} dyClick="font-size:2rem;" dyOrder={['onClick', 'onFocus']} dyState={{ onClick: 'count', onFocus: 'on' }} watchValueMap={{ count3 }}>
                    count is {count3}
                </Button>
                <Button onClick={() => setCount3((e) => (e = 0))}>카운트 초기화</Button>
            </Box> */}
        </Box>
    )
}
export default Main
