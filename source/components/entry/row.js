var html = require('choo/html')
var css = require('sheetify')

var styles = css`
  :host {
    display: grid;
    grid-template-columns: repeat(12, 1fr); 
  }

  :host > :nth-child(1) { grid-column: span 3; font-family: var(--mono) }
  :host > :nth-child(2) { grid-column: span 4 }
`

module.exports = row

function row (state, emit, props) {
  return html`
    <div class="${styles}">
      <div>${props.date}</div>
      <a href="${props.name}">${props.title}</a>
    </div>
  `
}
