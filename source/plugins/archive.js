var Page = require('enoki/page')

module.exports = archive

function archive () {
  return function (state, emitter, app) {
    state.archive = {
      toggled: false,
      visited: [ ],
      active: [ ]
    }

    state.events.ARCHIVE_ADD = 'archive:add'
    state.events.ARCHIVE_REMOVE = 'archive:remove'
    state.events.ARCHIVE_TOGGLE = 'archive:toggle'
    state.events.ARCHIVE_RESET = 'archive:reset'

    emitter.on(state.events.ARCHIVE_ADD, handleAdd)
    emitter.on(state.events.ARCHIVE_REMOVE, handleRemove)
    emitter.on(state.events.ARCHIVE_TOGGLE, handleToggle)
    emitter.on(state.events.ARCHIVE_RESET, handleReset)

    function handleAdd (data) {
      data = data || { }
      if (state.archive.active.indexOf(data.name) < 0) {
        state.archive.active.push(data.name)
        if (state.archive.visited.indexOf(data.name) < 0) {
          state.archive.visited.push(data.name)
        }
        if (data.render !== false) emitter.emit(state.events.RENDER)
      }
    }

    function handleRemove (data) {
      data = data || { }
      if (state.archive.active.indexOf(data.name) >= 0) {
        var index = state.archive.active.indexOf(data.name)
        state.archive.active.splice(index, 1)
        if (data.render !== false) emitter.emit(state.events.RENDER)
      }
    }

    function handleReset (data) {
      data = data || { }
      state.archive.active = [ ]
      console.log(state.archive.active)
      if (data.render !== false) emitter.emit(state.events.RENDER)
    }

    function handleToggle (data) {
      data = data || { }
      var shouldToggle = !state.archive.toggled
      var shouldRender = data.render !== false

      if (shouldToggle) {
        state.archive.active = Page(state)('/archive')
          .children()
          .visible()
          .toArray()
          .map(function (props) {
            return props.name
          })
      } else {
        state.archive.active = [ ]
      }

      delete data.render
      state.archive.toggled = shouldToggle
      if (shouldRender) emitter.emit(state.events.RENDER)
    }
  }
}
