var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')
var xtend = require('xtend')

var styles = css`
  :host {
    position: relative;
  }

  :host > img {
    opacity: 0;
  }

  :host > img:not(:first-child) {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`

module.exports = class Drawings extends Nanocomponent {
  constructor (name, state, emit) {
    super()
    this.state = state
    this.emit = emit
    this.local = {
      delay: 500,
      index: -1,
      imgs: [ ]
    }

    this.handleEnter = this.handleEnter.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
  }

  load (element) {
    if (this.frame) return
    this.tick()
  }

  unload (element) {
    clearInterval(this.frame)
    this.frame = undefined
  }

  createElement (props) {
    this.local = xtend(this.local, props)

    return html`
      <div
        class="${styles}"
        onmouseenter=${this.handleEnter}
        onmouseleave=${this.handleLeave}
      >
        ${this.local.imgs.map(this.createImage)}
      </div>
    `
  }

  createImage (props) {
    return html`<img src="${props.path}">`
  }

  tick () {
    this.local.index += 1
    var prevIndex = mod(this.local.index - 1, this.local.imgs.length)
    var nextIndex = mod(this.local.index, this.local.imgs.length)
    var prevImg = this.element.querySelector(`img:nth-child(${prevIndex + 1})`)
    var nextImg = this.element.querySelector(`img:nth-child(${nextIndex + 1})`)
    prevImg.style.opacity = ''
    nextImg.style.opacity = 1
  }

  update (props) {
    return false
  }

  handleLeave (event) {
    clearInterval(this.frame)
    this.frame = undefined
  }

  handleEnter (event) {
    this.tick()
    this.frame = setInterval(this.tick.bind(this), this.local.delay)
  }
}

function mod (num, mod) {
  var remain = num % mod
  return Math.floor(remain >= 0 ? remain : remain + mod)
}
