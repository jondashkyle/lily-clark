var html = require('choo/html')
var content = require('./content')
var css = require('sheetify')
var row = require('./row')

var styles = css`
  :host {
    padding: 0; 
  }

  :host:not(:last-child) {
    border-bottom: 1px solid #000;
  }

  :host > a {
    display: block;
    padding: 1rem 0;
  }

  :host.entry-active {
    padding: 0 0 1rem 0;
  }

  :host.entry-active > a {
    display: block;
    padding: 1rem 0 0;
  }
`

module.exports = entry

function entry (state, emit, props) {
  return html`
    <div
      class="${styles} ${props.active ? 'entry-active' : ''}"
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
    if (typeof props.handleClick === 'function') props.handleClick(event)
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
