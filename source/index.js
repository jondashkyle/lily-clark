var css = require('sheetify')
var choo = require('choo')
var wrapper = require('./views/wrapper')

// styles
css('nanoreset')
css('./index.css')

// our app
var app = choo()
app.use(require('enoki/choo')())

app.route('*', wrapper(require('./views/default')))
app.route('/archive', wrapper(require('./views/archive')))

// start
if (!module.parent) app.mount('body')
else module.exports = app
