import { logGroup, logStyle } from '@debug'
import { generateRenderData } from '@core'

function createItem(config) {
    const getRenderData = generateRenderData(config)

    logStyle('config', config, 'skyblue')

    return function Component(props) {
        const renderData = getRenderData(props)

        // logGroup('create-item')
        // logStyle('props', props, 'coral')

        const { isAllowChild, tag: Tag, baseProps, children } = renderData

        const renderTagWithoutChildren = () => <Tag {...baseProps} />
        const renderTagWithChildren = () => <Tag {...baseProps}>{children}</Tag>

        return isAllowChild ? renderTagWithChildren() : renderTagWithoutChildren()
    }
}

export default createItem
