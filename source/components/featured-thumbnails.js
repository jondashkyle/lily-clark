var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')

var styles = css`
  :host {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 1rem;
  }
`

var stylesThumb = css`
  :host {
    text-align: center;
    grid-column: span 6;
  }

  :host > h3 {
    margin: 1rem 0;
  }

  @media (max-width: 800px) {
    :host {
      grid-column: span 13;
    }
  }
`


module.exports = createFeaturedThumbnails

function createFeaturedThumbnails (state, emit) {
  var page = Page(state)
  var projects = page('/archive')
    .children()
    .toArray()
    .filter(isFeatured)
    .map(function (props) {
      var p = page(props).v()
      var thumb = page(props).file(p.thumbnail).v()
      return html`
        <a href="/${props.name}" class="${stylesThumb}">
          <img src="${thumb.path}">
          <h3>${p.title}</h3>
        </a>
      `
    })

  return html`
    <div class="thumbnails ${styles}">${projects}</div>
  `
}

function isFeatured (props) {
  return props.featured === true
}