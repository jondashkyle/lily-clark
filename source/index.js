var css = require('sheetify')
var choo = require('choo')
var wrapper = require('./views/wrapper')

// styles
css('nanoreset')
css('./index.css')

// our app
var app = choo()
app.use(require('enoki/choo')())
app.use(require('./plugins/ui')())
app.use(require('./plugins/archive')())

app.route('*', wrapper(require('./views/default')))
app.route('/', wrapper(require('./views/home')))
app.route('/about', wrapper(require('./views/about')))
app.route('/care', wrapper(require('./views/care')))
app.route('/video', wrapper(require('./views/video')))
app.route('/inquire', wrapper(require('./views/inquire')))
app.route('/:entry', wrapper(require('./views/featured')))
app.route('/:entry/:name', wrapper(require('./views/solo')))
app.route('/archive', wrapper(require('./views/archive')))
app.route('/archive/:entry', wrapper(require('./views/archive')))
app.route('/archive/:entry/:name', wrapper(require('./views/solo')))

// start
if (!module.parent) app.mount('body')
else module.exports = app
