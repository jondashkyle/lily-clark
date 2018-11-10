var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')
var xtend = require('xtend')
var path = require('path')

var Video = require('../components/featured-video')
var thumbnails = require('../components/featured-thumbnails')
var navigation = require('../components/navigation')
var featured = require('./featured')

var styles = css`
  :host > .thumbnails {
    margin-top: 1rem;
  }
`

module.exports = view

function view (state, emit) {
  var page = Page(state)

  return html`
    <div class="${styles}">
      ${navigation(state, emit)}
      ${state
        .cache(Video, 'home-video')
        .render({
          src: page('/featured').file('fountains.mp4').value('path'),
          poster: page('/featured').file('fountains.png').value('path')
        })
      }
      ${thumbnails(state, emit)}
    </div>    
  `
}
