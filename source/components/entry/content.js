var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')

var styles = css`
  :host {
    display: grid;
    grid-template-columns: repeat(12, 1fr); 
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    padding: 0.5rem 0;
  }

  :host > div {
    grid-column-start: 3;
    grid-column-end: span 10;
  }

  :host > div:nth-child(2) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }

  :host img {
    background-color: #eee;
    display: block;
  }

  @media (max-width: 800px) {
    :host > div {
      grid-column-start: 1;
      grid-column-end: span 12;
    }
  }
`

module.exports = entry

function entry (state, emit, props) {
  var page = Page(state)
  var files = page(props).files().toArray()

  return html`
    <div class="${styles}">
      <div>${props.text}</div>
      <div>
        ${files.map(function (file) {
          return createThumbnail(state, emit, file)
        })}
      </div>
    </div>
  `

  function createThumbnail (state, emit, file) {
    return html`
      <a href="${props.url}/${file.name}">
        <img src="${file.path}" />
      </a>
    `
  }
}