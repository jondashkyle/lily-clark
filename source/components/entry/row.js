var html = require('choo/html')
var css = require('sheetify')

var styles = css`
  :host {
    display: grid;
    grid-template-columns: repeat(12, 1fr); 
    grid-column-gap: 1rem;
  }
  
  :host > :nth-child(1) { grid-column: span 2 }
  :host > :nth-child(2) { grid-column: span 7 }
  :host > :nth-child(3) { grid-column: span 3 }

  :host > :nth-child(1) {
    display: flex;
    padding-right: 1rem;
  }

  :host > :nth-child(1) > span {
    width: 100%;
  }

  :host > :nth-child(3) {
    display: flex;
    justify-content: flex-end;
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
    :host > :nth-child(1) { display: none }
    :host > :nth-child(2) { grid-column: span 8 }
    :host > :nth-child(3) { grid-column: span 4 }
  }
`

module.exports = row

function row (state, emit, props) {
  return html`
    <div class="${styles}">
      <div>${formatDate(props.date)}</div>
      <div><p><span>${props.title}</span></p></div>
      <div>
        <div>${props.tags}</div>
        <div class="close ${props.active ? 'active' : ''}"></div>
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
