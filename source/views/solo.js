var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')
var path = require('path')

var Slideshow = require('../components/slideshow')
var slideshow = new Slideshow()

var styles = css`
  :host {
    position: relative;
  }

  :host .close {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 2;
  }
`

module.exports = view

function view (state, emit) {
  var page = Page(state)
  var parent = '/archive/' + state.params.entry
  var relative = path.resolve(state.href, '../')
  var files = getFiles()
  var file = getFile(files)
  var index = files.indexOf(file)

  if (!file) return html`<div>Not found</div>`

  return html`
    <div class="${styles}">
      <a href="${relative}" class="close active"></a>
      <div>
        ${slideshow.render(state, emit, {
          initialIndex: index,
          onSelect: function (_index) {
            var urlNext = relative + '/' + files[_index].name
            if (state.href === urlNext) return
            emit(state.events.PUSHSTATE, urlNext)
          },
          onStaticClick: function (event, pointer, cellElement, cellIndex) {
            emit(state.events.PUSHSTATE, relative)
          },
          elements: files.map(function (file) {
            return html`
              <div class="slide-contain no-pad">
                <img data-flickity-lazyload="${file.path}">
              </div>
            `
          })
        })}
      </div>
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
        .sortBy('name', 'asc')
        .toArray()
        .filter(function (props) {
          return props.extension !== '.svg'
        })
    } catch (err) {
      return false
    }
  }
}
