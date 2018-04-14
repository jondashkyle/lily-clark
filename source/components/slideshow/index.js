var Nanocomponent = require('nanocomponent')
var Flickity = require('flickity')
var html = require('choo/html')
var css = require('sheetify')
var xtend = require('xtend')

css('flickity/dist/flickity.min.css')
var styles = css('./index.css')

module.exports = class Slideshow extends Nanocomponent {
  constructor () {
    super()
    this.state = { }
    this.emit = () => { }

    this.props = {
      index: 0,
      elements: [],
      pageDots: false,
      infinite: true,
      wrapAround: true,
      lazyLoad: 2,
      onSelect: function () { },
      onStaticClick: function () { }
    }
  }

  load (element) {
    var self = this

    // skip if present
    if (this.flickity) return 

    // instantiate new one
    this.flickity = new Flickity(element, this.props)

    // select
    this.flickity.on('select', function (index) {
      if (index === self.props.index) return
      self.props.onSelect(index)
      self.props.index = index
    })

    // click
    this.flickity.on('staticClick', function (event, pointer, cellElement, cellIndex) {
      self.props.onStaticClick(event, pointer, cellElement, cellIndex)
    })
  }

  unload (element) {
    this.flickity.destroy()
    this.flickity = undefined
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
    props = props || { }

    if (this.flickity && props.initialIndex !== this.props.index) {
      this.state.index = props.initialIndex
      this.flickity.select(props.initialIndex)
    }

    return !this.flickity
  }
}