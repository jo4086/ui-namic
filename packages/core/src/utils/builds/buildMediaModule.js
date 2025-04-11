import { forEachObject } from '../shared'

export const buildMediaModule = (media) => {
    const positionMap = {
        up: 'min-width',
        down: 'max-width',
    }

    const result = []

    const ensurePx = (value) => (typeof value === 'number' ? `${value}px` : value)

    const processBlock = (type, list) => {
        return list.map((item) => {
            let conditions = []
            let style = { ...item }

            if (type === 'between') {
                const { up, down, ...rest } = item
                if (up) conditions.push(`(min-width: ${ensurePx(up)})`)
                if (down) conditions.push(`(max-width: ${ensurePx(down)})`)
                style = rest
            } else {
                const { point, ...rest } = item
                const condition = `(${positionMap[type]}: ${ensurePx(point)})`
                conditions.push(condition)
                style = rest
            }

            return { condition: conditions, style }
        })
    }

    forEachObject(media, (key, value) => {
        if (key === 'between' || key === 'up' || key === 'down') {
            const blocks = processBlock(key, value)
            result.push(...blocks)
        }

        if (key === 'advanced') {
            const advancedBlocks = value.map(({ query, ...style }) => ({
                condition: [query],
                style,
            }))
            result.push(...advancedBlocks)
        }
    })

    // console.log(result)

    return result
}

export default buildMediaModule
