var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')
var xtend = require('xtend')
var path = require('path')

var Video = require('../components/featured-video')
var navigation = require('../components/navigation')
var Slideshow = require('../components/slideshow')
var featured = require('./featured')

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
  var slides = page('/archive')
    .children()
    .toArray()
    .filter(isFeatured)
    .reduce(function (res, props) {
      var files = page(props)
        .files()
        .toArray()
        .filter(function (props) {
          return props.extension !== '.svg'
        })
      // no files
      if (!files.length) return res
      if (props.slides) {
        var slides = (typeof props.slides === 'string')
          ? props.slides
            .split('- ')
            .filter(slide => slide)
            .map(function (slide) {
              return slide.replace(/\n/g, '')
            })
          : props.slides
        slides.forEach(function (slide) {
          if (props.files[slide]) res.push(props.files[slide])
          else res.push(files[0])
        })
      } else {
        res.push(files[0])
      }
      return res
    }, [ ])
    var slidePage = page(path.resolve(slides[state.ui.home.index].url, '../')).v()
    var images = slides.map(function (file) {
      return html`
        <div class="slide-contain">
          <img data-flickity-lazyload="${file.path}">
        </div>
      `
    })

  // featured project
  // if (!state.ui.home.video) {
  //   var name = children[0].name
  //   return featured(
  //     xtend(state, { params: { entry: name } }),
  //     emit
  //   )
  // }

  return html`
    <div class="${styles}">
      ${navigation(state, emit)}
      ${renderSlideshowTitle()}
      ${renderSlideshow()}
      ${state.ui.home.video
        ? state
          .cache(Video, 'home-video')
          .render({
            src: page('/featured').file('fountains.mp4').value('path'),
            poster: page('/featured').file('fountains.png').value('path')
          })
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
      initialIndex: state.ui.home.index,
      onStaticClick: function (event, pointer, cellElement, cellIndex) {
        emit(state.events.PUSHSTATE, '/' + slidePage.name)
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
