var objectValues = require('object-values')
var Page = require('enoki/page')
var html = require('choo/html')
var entry = require('../components/entry')

module.exports = archive

function archive (state, emit, props) {
  var page = Page(state)
  var children = objectValues(page().children().value())
  return children.map(props => entry(state, emit, props))
}
