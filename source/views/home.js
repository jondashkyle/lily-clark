var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')

var Video = require('../components/featured-video')
var navigation = require('../components/navigation')
var Slideshow = require('../components/slideshow')

var slideshow = new Slideshow()

var styles = css`
  :host .slideshow-title {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    text-align: center;
    pointer-events: none;
    z-index: 2;
  }

  :host .slideshow-title a {
    pointer-events: auto;
  }
`

module.exports = view

function view (state, emit) {
  var page = Page(state)
  var children = page('/archive').children().toArray().filter(isFeatured)
  var slidePage = children[state.ui.home.index]
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
          <img data-flickity-lazyload="${file.path}">
        </div>
      `
    })

  return html`
    <div class="${styles}">
      ${navigation(state, emit)}
      ${renderSlideshowTitle()}
      ${renderSlideshow()}
      ${state.ui.home.video
        ? state.cache(Video, 'home-video').render()
        : ''
      }
    </div>    
  `

  function renderSlideshowTitle () {
    return html`
      <div class="slideshow-title">
        <a href="/${slidePage.name}">${slidePage.title}</a>
      </div>
    `
  }

  function renderSlideshow () {
    return slideshow.render(state, emit, {
      elements: images,
      startIndex: state.ui.home.index,
      onStaticClick: function (event, pointer, cellElement, cellIndex) {
        emit(state.events.PUSHSTATE, '/' + children[cellIndex].name)
      },
      onSelect: function (index) {
        if (index === state.ui.home.index) return
        emit(state.events.HOME, { index: index })
      }
    })
  }
}

function isFeatured (props) {
  return props.featured === true
}
