import { logGroup, logStyle } from '@debug'
import { generateRenderData } from '@core'
import { generateRenderData_v2 } from '@core'

function createItem(config) {
    const getRenderData = generateRenderData_v2(config)

    logStyle('config', config, 'skyblue')

    return function Component(props) {
        const renderData = getRenderData(props)

        // logGroup('create-item')
        // logStyle('props', props, 'coral')

        const { isAllowChild, tag: Tag, baseProps, children } = renderData

        // console.log('baseProps:', baseProps)

        const renderTagWithoutChildren = () => <Tag {...baseProps} />
        const renderTagWithChildren = () => <Tag {...baseProps}>{children}</Tag>

        return isAllowChild ? renderTagWithChildren() : renderTagWithoutChildren()
    }
}

export default createItem
