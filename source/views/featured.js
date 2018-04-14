var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')

var navigation = require('../components/navigation')
var format = require('../components/format')

var styles = css`
  :host {
    padding: 0 1rem;
  }

  :host .content {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 1rem;
    width: 100%;
  }

  :host .meta {
    grid-column-end: span 3;
    position: relative;
  }

  :host .copy {
    top: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: sticky;
    min-height: 100vh;
    width: 100%;
  }

  :host .purchase-link {
    display: block;
    position: absolute;
    bottom: 1rem;
    left: 0;
  }

  :host .text > * + * {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  :host .images {
    margin-top: 4rem;
    grid-column-end: span 6;
  }

  :host .images > * {
    display: block;
    margin-bottom: 1rem;
  }

  :host .thumbnails {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    grid-gap: 1rem;
    align-items: flex-end;
    margin-top: 3rem;
  }

  :host .thumbnail {
    display: block;
    text-align: center;
    margin-bottom: 1rem;
  }

  :host .thumbnail img {
    display: block;
    margin-bottom: 1rem;
    width: 100%;
  }

  :host .drawing {
    padding: 2rem;
  }

  @media (max-width: 767px) {
    :host .content {
      display: block;
    }

    :host .copy {
      padding-top: 4rem;
      min-height: auto;
      max-width: 25rem;
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

module.exports = view

function view (state, emit) {
  var page = Page(state)
  var url = '/archive/' + state.params.entry
  var children = page('/archive')
    .children()
    .toArray()
    .filter(function (props) {
      return props.featured === true
    })
  var files = page(url)
    .files()
    .toArray()
    .filter(function (props) {
      return props.extension !== '.svg'
    })

  if (!state.content[url]) {
    return createNotFound(state, emit)
  }

  return html`
    <div class="${styles}">
      ${navigation(state, emit)}
      <div class="content">
        <div class="meta">
          <div class="copy">
            <div class="text">
              <p>${page(url).value('title')}</p>
              <p>${page(url).value('dimensions')}</p>
              ${format(page(url).value('text'))}
              <p>${page(url).value('price')}</p>
            </div>
            <a href="mailto:${page('/').value('email')}" class="purchase-link">Inquire to purchase →</a>
          </div>
        </div>
        <div class="images">
          ${files.map(createImage)}
        </div>
        <div class="meta">
          <div class="copy drawing">
            <img src="${page(url).file('drawing.svg').value('path')}">
          </div>
        </div>
      </div>
      <div class="thumbnails">
        ${children.map(createChild)}
      </div>
    </div>
  `

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
      <a href="${state.href}/${props.name}">
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