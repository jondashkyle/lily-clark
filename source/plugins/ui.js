var html = require('choo/html')
var xtend = require('xtend')
var mbl = require('mbl')

module.exports = plugin

function plugin (opts) {
  return function (state, emitter) {
    state.ui = {
      assetsLoaded: false,
      home: {
        index: 0,
        video: true
      }
    }

    // events
    state.events.HOME = 'home'
    emitter.on(state.events.HOME, handleHome)
    emitter.on(state.events.NAVIGATE, handleNavigate)
    emitter.on(state.events.CONTENT_LOADED, handleLoad)

    function handleHome (data) {
      var shouldRender = data.render
      delete data.render
      state.ui.home = xtend(state.ui.home, data)
      if (shouldRender !== false) emitter.emit(state.events.RENDER)
    }

    function handleNavigate () {
      if (state.route !== 'archive/:entry' && state.route !== 'archive') {
        window.scrollTo(0, 0)
      }
    }

    function handleLoad () {
      // index
      if (!state.href) {
        var posterSrc = state.page('/featured').file('fountains.png').value('path') 
        mbl(html`<img data-src="${posterSrc}" data-mbl>`, {
          complete: function () {
            state.ui.assetsLoaded = true
            emitter.emit(state.events.RENDER)
          }
        }).start()
      } else {
        state.ui.assetsLoaded = true
        emitter.emit(state.events.RENDER)
      }
    }
  }
}
