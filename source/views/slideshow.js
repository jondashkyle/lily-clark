var Page = require('enoki/page')
var html = require('choo/html')
var Slideshow = require('../components/slideshow')
var slideshow = new Slideshow()

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
        <div style="display: flex;">
          <img src="${file.path}" style="height: 100%; width: 100%; object-fit: contain">
        </div>
      `
    })

  return html`
    <div>
      ${slideshow.render(state, emit, {
        elements: images
      })}
    </div>    
  `
}
