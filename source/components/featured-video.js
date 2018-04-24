var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var xtend = require('xtend')
var css = require('sheetify')

var styles = css`
  :host {
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    user-select: none;
    -moz-user-select: none;
  }

  :host video {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  :host .featured-skip,
  :host .featured-sound {
    position: absolute;
    bottom: 0;
    line-height: 1rem;
    padding: 1rem;
    cursor: pointer;
    z-index: 3;
  }

  :host .featured-sound { left: 0; }
  :host .featured-skip { right: 0; }

  :host .featured-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #000;
    transform: translateX(-100%);
  }
`

module.exports = class Video extends Nanocomponent {
  constructor(name, state, emit) {
    super()

    this.state = state
    this.emit = emit
    this.local = {
      src: '/content/featured/fountains.mp4',
      autoplay: true,
      muted: true,
      loop: false
    }

    this.handleCanPlayThrough = this.handleCanPlayThrough.bind(this)
    this.handleClickSkip = this.handleClickSkip.bind(this)
    this.handleSound = this.handleSound.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handleEnd = this.handleEnd.bind(this)
    this.frame = this.frame.bind(this)
  }

  update (props) {
    return false
  }

  load (element) {
    this.elProgress = element.querySelector('[data-progress]')
    this.elVideo = element.querySelector('video')
  }

  createElement (props) {
    this.local = xtend(this.local, props)

    return html`
      <div class="${styles}">
        <video
          src="${this.local.src}"
          oncanplaythrough=${this.handleCanPlayThrough}
          onpause=${this.handlePause}
          onclick=${this.handleSound}
          onplay=${this.handlePlay}
          onended=${this.handleEnd}
          style="cursor: pointer"
          poster="${this.local.poster ? this.local.poster : ''}"
          ${this.local.autoplay ? 'autoplay' : ''}
          ${this.local.muted ? 'muted' : ''}
          ${this.local.loop ? 'loop' : ''}
        ></video>
        <div
          class="featured-sound"
          onclick=${this.handleSound}
          onmouseenter=${this.handleSound}
        >${this.local.muted ? 'Unmute' : 'Mute'}</div>
        <div
          class="featured-skip"
          onclick=${this.handleClickSkip}
        >Skip Video →</div>
        <div class="featured-progress" data-progress></div>
      </div>
    `
  }

  handleCanPlayThrough (event) {
    this.elVideo.play()
  }

  handlePlay () {
    this.frame()
  }

  handlePause () {
    window.cancelAnimationFrame(this.tick)
  }

  frame () {
    var progress = 100 - (100 / this.elVideo.duration) * this.elVideo.currentTime
    if (this.elProgress) {
      this.elProgress.style.transform = 'translateX(' + progress * -1 + '%)'
    } 
    this.tick = window.requestAnimationFrame(this.frame)
  }

  handleSound (event) {
    var video = this.element.querySelector('video')
    var sound = this.element.querySelector('.featured-sound')

    if (event.type === 'mouseenter') {
      if (this.local.muted) this.local.muted = false
    } else {
      this.local.muted = !this.local.muted
    }
    
    this.elVideo.style.cursor = 'default'

    if (video && sound) {
      if (this.local.muted) {
        video.setAttribute('muted', true)
        sound.innerHTML = 'Unmute'
      } else {
        video.removeAttribute('muted')
        sound.innerHTML = 'Mute'
      }
    }
  }

  handleEnd () {
    window.cancelAnimationFrame(this.tick)
    this.emit(this.state.events.HOME, { video: false })
  }

  handleClickSkip () {
    window.cancelAnimationFrame(this.tick)
    this.emit(this.state.events.HOME, { video: false })
  }
}
