export function showOverlayError(message) {
    if (document.getElementById('__uinamic_overlay__')) return

    const style = `
    #__uinamic_overlay__ {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      z-index: 99999;
      background: rgba(0, 0, 0, 0.85);
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 60px;
      pointer-events: auto;
    }
    .uinamic-overlay-box {
      background: #1e1e1e;
      color: #fdd;
      padding: 1.5rem;
      border-radius: 8px;
      max-width: 90vw;
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
      font-family: monospace;
      position: relative;
    }
    .uinamic-overlay-box button {
      position: absolute;
      top: 0.5rem; right: 0.5rem;
      background: #ff5555;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 0.3rem 0.7rem;
      cursor: pointer;
    }
    .uinamic-overlay-box pre {
      white-space: pre-wrap;
      font-size: 0.9rem;
      margin-top: 1rem;
    }
  `

    const styleTag = document.createElement('style')
    styleTag.textContent = style
    document.head.appendChild(styleTag)

    const wrapper = document.createElement('div')
    wrapper.id = '__uinamic_overlay__'
    wrapper.innerHTML = `
    <div class="uinamic-overlay-box">
      <button onclick="document.getElementById('__uinamic_overlay__')?.remove()">✖</button>
      <strong>🚨 UINAMIC ERROR</strong>
      <pre>${escapeHtml(message)}</pre>
    </div>
  `
    wrapper.onclick = (e) => {
        if (e.target === wrapper) wrapper.remove()
    }

    document.body.appendChild(wrapper)
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
