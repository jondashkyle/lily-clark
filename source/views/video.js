var html = require('choo/html')
var Video = require('../components/featured-video')

module.exports = view

function view (state, emit) {
  return html`
    <div>
      ${state
        .cache(Video, 'video-solo')
        .render({
          contain: true,
          loop: true,
          muted: false,
          ui: false
        })
      }
    </div>
  `
}
