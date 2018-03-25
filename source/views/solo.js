var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')
var path = require('path')

var styles = css`
  :host {
    display: flex;
    height: 100vh;
    width: 100%;
    position: relative;
  }

  :host img {
    position: relative;
    object-fit: contain;
    height: 100%;
    width: 100%;
  }

  :host .close {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 2;
  }

  :host > a:first-child {
    display: flex;
    height: 100%;
    width: 100%;
  }
`

module.exports = view

function view (state, emit) {
  var page = Page(state)
  var parent = path.resolve(state.href, '../')
  var files = getFiles()
  var file = getFile(files)

  if (!file) return html`<div>Not found</div>`

  return html`
    <div class="${styles}">
      <a href="${parent}"><img src="${file.path}"></a>
      <a href="${parent}" class="close active"></a>
    </div>
  `

  function getFile (files) {
    try {
      return files
        .filter(function (props) {
          return props.name === state.params.name
        })[0]
    } catch (err) {
      return false
    }
  }

  function getFiles () {
    try {
      return page(parent)
        .files()
        .toArray()
    } catch (err) {
      return false
    }
  }
}