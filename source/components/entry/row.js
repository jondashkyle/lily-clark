var html = require('choo/html')
var css = require('sheetify')

var styles = css`
  :host {
    display: flex;
    justify-content: space-between;
  }
  
  :host .date {
    display: flex;
    padding-right: 1rem;
    width: 20%;
  }

  :host .date > span { width: 100% }
  :host .date > span:nth-child(3) { text-align: center }
  :host .date > span:nth-child(5) { text-align: right }

  :host .text {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  :host .title {
    max-width: 30rem;
  }

  :host .meta {
    display: flex;
    margin-left: 1rem;
  }

  :host p {
    max-width: 30rem;
  }

  :host p span {
    
  }

  :host .slash { position: relative }
  :host .slash:before {
    background: currentColor;
    display: block;
    content: '';
    height: 1.5rem;
    position: absolute;
    left: 50%;
    top: 0;
    transform: rotate(15deg);
    width: 1px;
  }

  @media (max-width: 800px) {
    :host .date { display: none }
  }
`

module.exports = row

function row (state, emit, props) {
  return html`
    <div class="${styles}">
      <div class="date">${formatDate(props.date)}</div>
      <div class="text">
        <div class="title"><p><span>${props.title}</span></p></div>
        <div class="meta">
          <div>${props.tags}</div>
          <div class="minimize ${props.active ? 'active' : ''}"></div>
        </div>
      </div>
    </div>
  `
}

function formatDate (str) {
  return (str || '')
    .split('-')
    .reduce(function (arr, str, i, src) {
      arr.push(html`<span>${str.slice(-2)}</span>`)
      if (i < src.length - 1) arr.push(html`<span class="slash"></span>`)
      return arr
    }, [ ])
}
