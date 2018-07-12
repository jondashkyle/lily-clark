var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')

var navigation = require('../components/navigation')
var format = require('../components/format')

var styles = css`
  :host {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    flex-wrap: wrap;
  }

  :host .copy {
    width: 100%;
    max-width: 24rem;
  }

  :host .copy > * + * {
    margin-top: 1rem;
  }

  :host img {
    width: 100%;
    height: auto;
  }

  @media (max-width: 800px) {
    :host {
      padding: 2.5rem 1rem 1rem 1rem;
    }
  }
`

module.exports = view

function view (state, emit) {
  var page = Page(state)

  return html`
    <div class="${styles}">
      ${navigation(state, emit)}
      <div class="copy">
        ${format(page().value('text'))}
      </div>
    </div>
  `
}
