export const validHtmlTagSet = new Set([
    // 일반 구조
    'div',
    'span',
    'p',
    'a',
    'img',
    'button',
    'input',
    'textarea',
    'label',

    // 시맨틱 구조
    'section',
    'article',
    'header',
    'footer',
    'main',
    'nav',
    'aside',

    // 텍스트/타이포
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'strong',
    'em',
    'small',
    'blockquote',

    // 목록
    'ul',
    'ol',
    'li',
    'dl',
    'dt',
    'dd',

    // 테이블
    'table',
    'thead',
    'tbody',
    'tfoot',
    'tr',
    'td',
    'th',
    'caption',
    'colgroup',
    'col',

    // 폼 요소
    'form',
    'fieldset',
    'legend',
    'select',
    'option',
    'optgroup',

    // 미디어
    'video',
    'audio',
    'source',
    'canvas',
    'svg',
    'picture',

    // 기타
    'iframe',
    'br',
    'hr',
    'details',
    'summary',
    'code',
    'pre',

    // HTML5 확장
    'dialog',
    'meter',
    'progress',
    'time',
    'mark',

    // 구조 제어용
    'template',
    'script',
    'noscript',
    'style',
    'slot',
])
