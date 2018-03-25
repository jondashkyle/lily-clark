var Nanocomponent = require('nanocomponent')
var Flickity = require('flickity')
var html = require('choo/html')
var css = require('sheetify')
var xtend = require('xtend')

css('flickity/dist/flickity.min.css')

var styles = css`
  :host .flickity-slider > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }
`

module.exports = class Slideshow extends Nanocomponent {
  constructor () {
    super()
    this.state = { }
    this.emit = () => { }

    this.props = {
      elements: [],
      infinite: true,
      wrapAround: true
    }
  }

  load (element) {
    var self = this
    this.flickity = new Flickity(element, this.props)
    this.flickity.on('select', function (index) {
      self.props.index = index
    })
  }

  createElement (state, emit, props) {
    this.props = xtend(this.props, props)
    this.state = state
    this.emit = emit

    return html`
      <div class="${styles}">
        ${this.props.elements}
      </div>
    `
  }

  update (state, emit, props) {
    return false
  }
}