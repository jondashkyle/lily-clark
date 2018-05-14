var html = require('choo/html')
var Video = require('../components/featured-video')
var css = require('sheetify')

var styles = css`
  :host .close {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 9;
  }
`

module.exports = view

function view (state, emit) {
  return html`
    <div class="${styles}">
      <a href="/archive/spillway" class="close active"></a>
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
