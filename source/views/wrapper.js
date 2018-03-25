var html = require('choo/html')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    // loading
    if (!state.site.loaded) {
      return createLoading(state, emit)
    }

    // 404
    if (
      state.route !== 'archive/:entry/:name' &&
      !state.content[state.href || '/']
    ) {
      return createNotFound(state, emit)
    }

    return html`
      <body>
        <a href="/" class="icon"></a>
        ${view(state, emit)}
      </body>
    `
  }
}

function createLoading (state, emit) {
  return html`
    <body>
      <div class="container">
        <h1>Loading</h1>
      </div>
    </body>
  `
}

function createNotFound (state, emit) {
  return html`
    <body>
      <h1>Page not found</h1>
    </body>
  `
}
