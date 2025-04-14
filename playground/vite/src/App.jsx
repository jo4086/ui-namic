import { useState, Children } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// import { Box, Input, Button } from '@uinamic/react-ui'
// import { Box } from '@react-ui'
import { Box, Input, Button } from '@react-ui'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Main from './pages/Main'
import Tree from './pages/Tree'
import Node from './pages/Node'
import Root from './pages/Root'
// import { Box } from '@uinamic/react-ui'
// import { logStyle } from '@debug'

function App() {
    const [count, setCount] = useState(0)
    // return (
    //     <>
    //         <Box>
    //             <Box></Box>
    //         </Box>
    //     </>
    // )

    return (
        <>
            <Routes>
                <Route path="/" element={<Root />} />
                <Route path="/home" element={<Home />} />
                <Route path="/main" element={<Main />} />
                <Route path="/tree" element={<Tree />} />
                <Route path="/node" element={<Node />} />
            </Routes>
        </>
    )

    return (
        <Routes>
            <Box>
                <Box className="container" dynamicStyle={boxStyle4}>
                    <Box style={{ flexDirection: 'column', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '0', content: '"hiddasdasd"' }}>
                        <a href="https://vite.dev" target="_blank">
                            <img src={viteLogo} className="logo" alt="Vite logo" />
                        </a>
                        <a href="https://react.dev" target="_blank">
                            <img src={reactLogo} className="logo react" alt="React logo" />
                        </a>
                    </Box>
                    <Box>
                        <blockquote>
                            open-quote blockquote
                            <blockquote>open-quote 중첩 close-quote</blockquote>
                            close-quote
                        </blockquote>
                        <div className="div1">
                            open-quote div
                            <div className="div1_1">open-quote 중첩 close-quote</div>
                            close-quote
                        </div>
                    </Box>
                    <Box style={{ display: 'grid', justifyContent: 'center', backgroundColor: 'gray', padding: '10px' }}>
                        <h1>Vite + React</h1>
                        <div className="card" style={{ position: 'relative' }}>
                            <Button dynamicStyle={pseudoStyle} dynamicType="onClick" onClick={() => setCount((count) => count + 1)}>
                                count is {count}
                            </Button>{' '}
                            {/* <Button dynamicStyle={{ dynamic: { backgroundColor: 'blue' } }} dynamicType="onClick" onClick={() => setCount((count) => count + 1)}>
                            count is {count}
                        </Button> */}
                            <p>
                                Edit <code>src/App.jsx</code> and save to test HMR
                            </p>
                        </div>
                        <p style={{ color: 'red' }} className="read-the-docs">
                            Click on the Vite and React logos to learn more
                        </p>
                    </Box>
                </Box>
            </Box>
        </Routes>
    )

    return (
        <Box style={{ gap: '10px' }}>
            <Box dynamicStyle={style1}>
                <div>
                    <a href="https://vite.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>
                </div>
                <h1>Vite + React</h1>
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                    <p>
                        Edit <code>src/App.jsx</code> and save to test HMR
                    </p>
                </div>
                <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
                <p></p>
            </Box>
            <Box>'자식이에요'</Box>
            <Box>'자식이에요'</Box>
            <Button />
            <Input></Input>
        </Box>
    )
}

export default App
const commonStyle = { one: '0.5s ease 1' }

const pseudoStyle = {
    fontSize: '2rem',
    dynamic: {
        backgroundColor: 'cyan',
        color: 'black',
    },
    pseudo: {
        hover: {
            color: 'green',
            backgroundColor: 'black',
        },
        after: {
            position: 'absolute',
            content: '"hello"',
            left: '30px',
            top: '3px',
            fontSize: '16px',
            transition: [`left ${commonStyle.one}`, `top ${commonStyle.one}`, `font-size ${commonStyle.one}`],
        },
        before: {
            // color: 'red',
            position: 'absolute',
            content: '"Click to Change Opacity"',
            right: '-220px',
            top: '0px',
            transition: [`left ${commonStyle.one}`, `top ${commonStyle.one}`, `font-size ${commonStyle.one}`],
        },
        focus: {
            outline: 'none',
        },
    },
}

const boxStyle4 = {
    userSelect: 'none',
    gap: '20px',
    color: 'black',
    fontSize: '20px',
    border: '1px solid black',
    outline: 0,
    // width: '500px',
    // margin: '30px auto 0 30px',
    backgroundColor: 'white',
    // justifyContent: 'end',
    // padding: '0 20px',
    boxSizing: 'border-box',
    textAlign: 'right',
    transition: [{ name: 'color, background-color', value: '0.5s ease 1' }, 'font-size 1s ease-in-out 1'],
    // cursor: 'pointer',
    // whiteSpace: 'nowrap',
    position: 'relative',
    // width: 'auto',

    keyframes: {
        move: {
            duration: '3s',
            iteration: 5,
            timingFunction: 'ease-in-out',
            percent: {
                0: { transform: 'translateX(0%)', opacity: 0, easing: 'ease-in' },
                // 15: { transform: 'translateX(50%)', opacity: 0.3, easing: 'ease-in-out' },
                // 70: { transform: 'translateX(75%)', opacity: 0.7, easing: 'linear' },
                100: { transform: 'translateX(50%)', opacity: 1, cursor: 'default', easing: 'ease-out' },
            },
        },
        scale: {
            animation: '3s 5 ease-in-out',
            percent: {
                0: { transform: 'scale(1)' },
                100: { transform: 'scale(1.5)' },
            },
        },
    },

    media: {
        between: [
            { up: 768, down: 1023, width: '200px', height: '50px' },
            { up: 1024, down: 1279, width: '300px', height: '100px' },
        ],
        down: [
            { point: 1023, width: '200px', height: '50px' },
            { point: 1279, width: '300px', height: '100px' },
            { point: 1439, width: '400px', height: '150px' },
        ],
        up: [
            { point: 768, width: '200px', height: '50px' },
            { point: 1280, width: '300px', height: '100px' },
        ],
        advanced: [{ query: 'screen, (min-width: 768px) and (max-width: 1023px)', width: '300px' }],
    },

    dynamic: {
        color: 'blue',
        backgroundColor: 'pink',
        padding: '0 200px',

        pseudo: {
            hover: {
                backgroundColor: 'red',
                color: 'white',
            },
            after: {
                position: 'absolute',
                content: '"hello"',
                left: '30px',
                top: '3px',
                fontSize: '16px',
                transition: [`left ${commonStyle.one}`, `top ${commonStyle.one}`, `fontSize ${commonStyle.one}`],
            },
            before: {
                opacity: '0',
            },
        },
    },
}

const style1 = {
    flexDirection: 'column',
    border: '2px solid red',
    dynamic: {
        color: 'blue',
    },
}

const style2 = {
    border: '4px double rgba(0,0,0,0.4)',
    flexDirection: 'column',
    dynamic: {
        color: 'blue',
    },
}
