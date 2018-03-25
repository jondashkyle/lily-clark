var html = require('choo/html')
var content = require('./content')
var css = require('sheetify')
var row = require('./row')

var styles = css`
  :host {
    
  }

  :host > a {
    display: block;
  }
`

module.exports = entry

function entry (state, emit, props) {
  return html`
    <div
      class="${styles}"
      id="entry-${props.name}"
      onmouseenter=${handleMouseenter}
    >
      <a
        href="${props.active ? '/archive' : props.url}"
        onclick=${handleClick}
      >
        ${row(state, emit, props)}
      </a>
      ${props.active ? content(state, emit, props) : ''}
    </div>
  `

  function handleClick (event) {
    if (props.active) {
      emit(state.events.ARCHIVE_REMOVE, { name: props.name })
    }
  }

  function handleMouseenter (event) {
    // if (state.href !== props.url && props.active) {
    //   emit(state.events.PUSHSTATE, props.url)
    // }
  }
}
