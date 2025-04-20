export function removeOverlayError(code = 'default') {
    const el = document.querySelector(`[data-uinamic-error="${code}"]`)
    if (el) el.remove()
}
