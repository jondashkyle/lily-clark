var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')

var Drawings = require('../components/drawings')
var navigation = require('../components/navigation')
var thumbnails = require('../components/featured-thumbnails')
var format = require('../components/format')

var styles = css`
  :host {

  }

  :host .content {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 1rem;
    width: 100%;
  }

  :host .meta {
    grid-column-end: span 3;
    padding: 0 1rem;
    position: relative;
  }

  :host .copy {
    top: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: -webkit-sticky;
    position: sticky;
    min-height: 100vh;
    width: 100%;
  }

  :host .purchase-link {
    line-height: 1.5rem;
    display: flex;
    position: absolute;
    padding-top: 0.5rem;
    bottom: 0.75rem;
    left: 0;
  }

  :host .purchase-link a {
    text-decoration: none;
  }

  :host .text {
    max-width: 15rem;
    width: 100%;
  }

  :host .text > * + * {
    margin-top: 0.5rem;
  }

  :host .images {
    margin-top: 3.5rem;
    grid-column-end: span 6;
  }

  :host .images > * {
    background: #eee;
    display: block;
    margin-bottom: 1rem;
  }

  :host .images > *:last-child {
    margin-bottom: 0;
  }

  :host .images img {
    display: block;
  }

  :host .drawing {
    padding: 2rem;
    max-width: 12rem;
    margin: 0 auto;
  }

  :host .thumbnails {
    padding-top: 3.5rem;
  }

  @media (max-width: 767px) {
    :host .content {
      display: block;
    }

    :host .copy {
      padding-top: 4rem;
      min-height: auto;
      max-width: 25rem;
      width: 100%;
    }

    :host .purchase-link {
      position: static;
      padding-bottom: 0;
    }

    :host .drawing {
      display: none;
    }
  }
`

var THUMBNAILS = false

module.exports = view

function view (state, emit) {
  var page = Page(state)
  var url = '/archive/' + state.params.entry
  var drawings = page(url)
    .files()
    .sortBy('name', 'asc')
    .toArray()
    .filter(function (props) {
      return props.extension === '.svg'
    })
  var children = page('/archive')
    .children()
    .toArray()
    .filter(function (props) {
      return props.featured === true
    })
  var files = page(url)
    .files()
    .sortBy('name', 'asc')
    .toArray()
    .filter(function (props) {
      return props.extension !== '.svg'
    })

  if (!state.content[url]) {
    return createNotFound(state, emit)
  }

  return html`
    <div class="${styles}">
      ${navigation(state, emit, { fixed: true })}
      <div class="content" id="featured-${page().value('name')}">
        <div class="meta">
          <div class="copy">
            <div class="text">
              <p>${page(url).value('title')}</p>
              <p>${page(url).value('dimensions')}</p>
              ${format(page(url).value('text'))}
              <p>${page(url).value('price')}</p>
            </div>
            <div class="purchase-link">
              <a href="/inquire">Inquire to purchase</a>
              <div class="skip-arrow"></div>
            </div>
          </div>
        </div>
        <div class="images">
          ${files.map(createImage)}
        </div>
        ${drawings.length ? createDrawing() : ''}
      </div>
      ${thumbnails(state, emit)}
    </div>
  `

  function createDrawing () {
    return html`
      <div class="meta">
        <div class="copy drawing">
          ${state
            .cache(Drawings, page().v('name') + 'drawings')
            .render({ imgs: drawings })
          }
        </div>
      </div>
    `
  }

  function createChild (props) {
    var files = page(props).files().toArray()
    var file = files[0]
    return html`
      <a href="/${props.name}" class="thumbnail">
        <img src="${file.path}">
        ${props.title}
      </a>
    `
  }

  function createImage (props) {
    if (!props.name) return
    return html`
      <a href="/${state.params.entry}/${props.name}">
        <img src="${props.path}" />
      </a>
    `
  }
}

function createNotFound (state, emit) {
  return html`
    <body>
      <h1>Page not found</h1>
    </body>
  `
}