var html = require('choo/html')
var row = require('./row')

module.exports = entry

function entry (state, emit, props) {
  return row(state, emit, props)
}
