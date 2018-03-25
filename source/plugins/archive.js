module.exports = archive

function archive () {
  return function (state, emitter, app) {
    state.archive = {
      visited: [ ],
      active: [ ]
    }

    state.events.ARCHIVE_ADD = 'archive:add'
    state.events.ARCHIVE_REMOVE = 'archive:remove'

    emitter.on(state.events.ARCHIVE_ADD, handleAdd)
    emitter.on(state.events.ARCHIVE_REMOVE, handleRemove)

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
  }
}
