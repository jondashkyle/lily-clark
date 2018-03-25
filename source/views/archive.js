var Page = require('enoki/page')
var html = require('choo/html')

var Archive = require('../components/archive')
var archive = new Archive()

module.exports = view

function view (state, emit) {
  var page = Page(state)
  var href = '/archive'

  var children = page(href)
    .children()
    .sortBy('date', 'desc')
    .value()

  // active states
  children.forEach(function (props) {
    if (
      state.href === props.url &&
      state.archive.active.indexOf(props.name) < 0
    ) {
      emit(state.events.ARCHIVE_ADD, { name: props.name })
    }
  })

  return html`
    <div>
      ${archive.render(state, emit, {
        visited: state.archive.visited,
        active: state.archive.active,
        entry: state.params.entry,
        children: children,
        href: href
      })}
    </div>
  `
}
