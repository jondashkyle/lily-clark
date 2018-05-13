var Nanocomponent = require('nanocomponent')
var scrollmonitor = require('scrollmonitor')
var objectValues = require('object-values')
var html = require('choo/html')
var css = require('sheetify')
var xtend = require('xtend')
var path = require('path')

var entry = require('./entry')

var styles = css`
  :host {
    padding: 0 1rem 0 4rem;
  }

  :host .archive-toggle {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    padding: 1rem;
  }

  @media (max-width: 800px) {
    :host {
      padding: 0 1rem 0 1rem;
    }

    :host .archive-toggle {
      position: absolute;
      bottom: auto;
      left: auto;
      top: 0;
      right: 0;
    }
  }
`

module.exports = class Archive extends Nanocomponent {
  constructor () {
    super()
    this.state = { } 
    this.emit = () => { }
    this.watchers = { }

    this.props = {
      children: [ ],
      visited: [ ],
      active: [ ],
      entry: ''
    }

    this.handleToggle = this.handleToggle.bind(this)
  }

  load (element) {
    var self = this

    // see if there is an element matching our active entry
    var el = document.getElementById('entry-' + this.props.entry)

    // load into view if so
    if (el && typeof window !== 'undefined') {
      // clearly a hack
      setTimeout(function () {
        window.scrollTo(0, el.getBoundingClientRect().top)
      }, 0)
    }

    // scroll tracking
    this.props.children.forEach(function (props) {
      var el = element.querySelector('[id="entry-' + props.name + '"]')
      if (!el) return
      var watcher = scrollMonitor.create(el)

      // store
      self.watchers[props.name] = watcher
      watcher.stateChange(handleChange)
      handleChange.call(watcher)

      function handleChange () {
        if (!this.isInViewport) return
        if (this.isFullyInViewport) {
          var shouldPush = self.props.active.indexOf(props.name) >= 0
          // update url
          if (shouldPush && props.name !== self.props.entry) {
            self.emit(
              self.state.events.PUSHSTATE,
              path.resolve(self.props.href, props.name)
            )
          }
        }
      }
    })
  }

  unload (element) {
    objectValues(this.watchers).forEach(function (watcher) {
      watcher.destroy()
    })
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

  handleToggle (event) {
    this.emit(this.state.events.ARCHIVE_TOGGLE)
  }

  update (state, emit, props) {
    return true
    // return (
    //   props.active.length !== this.props.active.length ||
    //   props.children.length !== this.props.children.length
    // )
  }
}