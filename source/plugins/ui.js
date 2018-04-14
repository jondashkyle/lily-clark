var xtend = require('xtend')

module.exports = plugin

function plugin (opts) {
  return function (state, emitter) {
    state.ui = {
      home: { index: 0 }
    }

    // events
    state.events.HOME = 'home'
    emitter.on(state.events.HOME, handleHome)
    emitter.on(state.events.NAVIGATE, handleNavigate)

    function handleHome (data) {
      var shouldRender = data.render
      delete data.render
      state.ui.home = xtend(state.ui.home, data)
      if (shouldRender !== false) emitter.emit(state.events.RENDER)
    }

    function handleNavigate () {
      if (state.route === ':entry') {
        window.scrollTo(0, 0)
      }
    }
  }
}
