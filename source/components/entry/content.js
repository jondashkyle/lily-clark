var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')
var format = require('../format')

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

  :host > div:nth-child(1) {
    max-width: 32rem;
  }

  :host > div:nth-child(2) {
    display: grid;
    /* grid-template-columns: repeat(4, 1fr); */
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }

  :host img {
    background-color: #eee;
    display: block;
  }

  :host .copy *+* {
    margin-top: 0.5rem;
  }

  :host .copy a {
    text-decoration: underline;
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
  var files = page(props)
    .files()
    .sortBy('name', 'asc')
    .toArray()
    .filter(function (props) {
      return props.extension !== '.svg'
    })

  return html`
    <div class="${styles}">
      <div class="copy">
        ${format(props.text)}
      </div>
      <div>
        ${files.map(function (file) {
          return createThumbnail(state, emit, file)
        })}
      </div>
    </div>
  `

  function createThumbnail (state, emit, file) {
    var href = file.href || props.url + file.name
    return html`
      <a href="${href}">
        <img src="${file.path}">
      </a>
    `
  }
}