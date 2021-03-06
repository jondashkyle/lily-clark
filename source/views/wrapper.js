var html = require('choo/html')
var css = require('sheetify')

var styles = css`
  :host.notfound {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
  }
`

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    // loading
    if (
      !state.site.loaded ||
      !state.ui.assetsLoaded
    ) {
      return createLoading(state, emit)
    }

    // 404
    if (
      state.route !== 'archive/:entry/:name' &&
      state.route !== ':entry' &&
      state.route !== ':entry/:name' &&
      state.route !== 'inquire' &&
      state.route !== 'video' &&
      !state.content[state.href || '/']
    ) {
      return createNotFound(state, emit)
    }

    // invert
    var invert = (
      state.route === 'archive/:entry/:name' ||
      state.route === ':entry/:name' || 
      state.route === 'video'
    ) ? 'invert' : ''

    // container
    return html`
      <body class="${invert}">
        <a href="/" class="icon"></a>
        ${view(state, emit)}
      </body>
    `
  }
}

function createLoading (state, emit) {
  return html`
    <body>
      <svg class="loading" id="Default" width="49.99" height="33.66" viewBox="0 0 49.99 33.66">
        <path vector-effect="non-scaling-stroke" fill="none" stroke="#000" stroke-width="1" class="cls-1" d="M2.49,12.33H16a4.5,4.5,0,0,0,4.5-4.5h0A4.5,4.5,0,0,0,16,3.33h0a4.5,4.5,0,0,0-4.5,4.5v18A4.5,4.5,0,0,1,7,30.33H7a4.5,4.5,0,0,1-4.5-4.5h0A4.5,4.5,0,0,1,7,21.33H43a4.5,4.5,0,0,1,4.5,4.5h0a4.5,4.5,0,0,1-4.5,4.5h0a4.5,4.5,0,0,1-4.5-4.5v-18A4.5,4.5,0,0,0,34,3.33h0a4.5,4.5,0,0,0-4.5,4.5h0a4.5,4.5,0,0,0,4.5,4.5h13.5"/>
      </svg>
    </body>
  `
}

function createNotFound (state, emit) {
  return html`
    <body class="${styles} notfound">
      <a href="/" class="icon"></a>
      <div class="copy">
        Page not found. Head <a href="/" class="tdu">home</a>?
      </div>
    </body>
  `
}
