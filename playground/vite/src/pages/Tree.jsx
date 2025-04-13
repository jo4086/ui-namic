import { Box, Button } from '@react-ui'

const componentTypes = ['Box', 'Button', 'Wrapper']

// DSL 컴포넌트 매핑
const getDSLComponent = (type, key, children) => {
    const Component =
        {
            Box,
            Button,
            Wrapper: Box, // Wrapper를 실제론 Box로 대응
        }[type] || Box

    return <Component key={key}>{children}</Component>
}

// 재귀 구조 생성기
const generateMixedTree = (depth = 0, maxDepth = 6, countRef = { current: 0 }, maxCount = 700) => {
    if (countRef.current >= maxCount || depth > maxDepth) return null

    const type = componentTypes[Math.floor(Math.random() * componentTypes.length)]

    // 자식 수는 depth와 랜덤성 기반
    const numChildren = Math.floor(Math.random() * (depth < 2 ? 4 : 2)) + (depth === 0 ? 1 : 0)

    const children = []
    for (let i = 0; i < numChildren; i++) {
        if (countRef.current >= maxCount) break
        countRef.current++
        const child = generateMixedTree(depth + 1, maxDepth, countRef, maxCount)
        if (child) children.push(child)
    }

    return getDSLComponent(type, `node-${countRef.current}-${depth}`, children)
}

const Tree = () => {
    const elements = []

    for (let i = 0; i < 700; i++) {
        elements.push(
            <Box key={`b-${i}`}>
                <Button>Button {i}</Button>
            </Box>
        )
    }

    return <>{elements}</>
}
export default Tree
