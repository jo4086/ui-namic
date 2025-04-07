import { logGroup, logStyle } from '@uinamic/debug'
import { generateRenderData } from '@uinamic/system'

function createItem(config) {
    const getRenderData = generateRenderData(config)

    logStyle('config', config, 'skyblue')

    return function Component(props) {
        const renderData = getRenderData(props)

        logGroup('create-item')
        // console.groupCollapsed('%cgroup', 'font-size:2rem')
        logStyle('props', props, 'coral')
        // console.groupCollapsed('%c🎯 props:', 'background-color:coral;font-size:2rem;padding:5px 10px 5px 3px')
        // console.log(props)
        // console.groupEnd()

        const { isAllowChild, tag: Tag, baseProps, children } = renderData

        const renderTagWithoutChildren = () => <Tag {...baseProps} />
        const renderTagWithChildren = () => <Tag {...baseProps}>{children}</Tag>

        return isAllowChild ? renderTagWithChildren() : renderTagWithoutChildren()
    }
}

export default createItem
