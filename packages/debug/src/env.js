export let prefix = 'TEST'

export function UINAMIC_ENV(trigger = 'develop') {
    if (trigger === 'product') {
        prefix = 'UINAMIC'
    } else if (trigger === 'develop') {
        prefix = 'TEST'
    }
}
