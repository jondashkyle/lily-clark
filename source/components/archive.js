var Nanocomponent = require('nanocomponent')
var objectValues = require('object-values')
var html = require('choo/html')
var css = require('sheetify')
var xtend = require('xtend')
var path = require('path')

var entry = require('./entry')

var styles = css`
  :host {
    display: grid;
    grid-template-columns: 100%;
    grid-row-gap: 0.5rem;
    padding: 1rem 1rem 1rem 4rem;
  }
`

module.exports = class Archive extends Nanocomponent {
  constructor () {
    super()
    this.state = { } 
    this.emit = () => { }

    this.props = {
      children: [ ],
      visited: [ ],
      active: [ ],
      entry: ''
    }

    this.handleIntersect = this.handleIntersect.bind(this)
  }

  load (element) {
    var el = document.getElementById('entry-' + this.props.entry)
    if (el) el.scrollIntoView()

    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(this.handleIntersect)
      ;[...element.children].forEach(el => this.observer.observe(el))
    }
  }

  unload (element) {
    if (typeof IntersectionObserver !== 'undefined') {
      this.observer.disconnect()
    }
  }

  createElement (state, emit, props) {
    this.state = state
    this.emit = emit
    this.props = xtend(this.props, props) 

    return html`
      <div class="${styles}">
        ${this.props.children.map(function (_props, i) {
          var local = xtend(_props, {
            visited: props.visited.indexOf(_props.name) >= 0,
            active: props.active.indexOf(_props.name) >= 0
          })
          return entry(state, emit, local)
        })}
      </div>
    `
  }

  handleIntersect (elements) {
    try {
      var el = elements.sort((a, b) => (
        b.intersectionRatio - a.intersectionRatio
      ))
      .filter(el => el.intersectionRatio)[0]
      var name = el.target.getAttribute('id').replace('entry-', '')
      var shouldPush = this.props.active.indexOf(name) >= 0
      if (shouldPush) this.emit(
        this.state.events.PUSHSTATE,
        path.resolve(this.props.href, name)
      )
    } catch (err) { }
  }

  update (state, emit, props) {
    return true
    // return (
    //   props.active.length !== this.props.active.length ||
    //   props.children.length !== this.props.children.length
    // )
  }
}
