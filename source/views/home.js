var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')

var Slideshow = require('../components/slideshow')
var slideshow = new Slideshow()

var styles = css`
  :host > div:nth-child(1) {
    position: fixed;
    top: 0;
    right: 0;
    margin: 1rem;
    z-index: 9;
  }
`

module.exports = view

function view (state, emit) {
  var page = Page(state)
  var children = page('/archive').children().toArray()
  var images = children
    .map(function (props) {
      var files = page(props).files().toArray()
      if (files.length) return files[0]
      else return false
    })
    .filter(file => file)
    .map(function (file) {
      return html`
        <div class="slide-contain">
          <img src="${file.path}">
        </div>
      `
    })

  return html`
    <div class="${styles}">
      <div>
        <a href="/archive">Archive</a>
      </div>
      ${slideshow.render(state, emit, {
        elements: images
      })}
    </div>    
  `
}
