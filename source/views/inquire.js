var html = require('choo/html')
var css = require('sheetify')

var navigation = require('../components/navigation')
var Inquire = require('../components/inquire')

var styles = css`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 3.5rem 1rem 1rem;
  }
`

module.exports = view

function view (state, emit) {
  return html`
    <div class="${styles}">
      ${navigation(state, emit)}
      ${state.cache(Inquire, 'inquire').render()}
    </div>
  `
}