var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var xtend = require('xtend')
var xhr = require('xhr')
var css = require('sheetify')

var styles = css`
  :host {
    padding: 1rem;
    width: 100%;
    max-width: 30rem;
    position: relative;
  }

  :host input, :host textarea, :host button {
    width: 100%;
    display: block;
    outline: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  :host input, :host textarea {
    margin-top: 0.5rem;
    padding: 0.5rem 0.5rem;
    background: #eee;
    box-shadow: none;
  }

  :host textarea {
    height: 10rem;
    resize: none;
  }

  :host button {
    padding: 0;
    background: 0;
  }

  :host input:focus,
  :host textarea:focus,
  :host button,
  :host button:active {
    outline: 0;
  }

  :host .freebirdFormviewerViewItemsItemItem {
    margin-bottom: 1rem;
  }

  :host .step {
    pointer-events: none;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.8);
  }
`

module.exports = class Inquire extends Nanocomponent {
  constructor (name, state, emit) {
    super()
    this.state = state
    this.emit = emit
    this.local = {
      action: 'https://docs.google.com/forms/d/e/1FAIpQLSeB87NPVv-WUPLfYxwYyWwffjDyI8P7JC3aQ2nuz6Xtki_jew/formResponse',
      step: 'input'
    }

    this.submit = this.submit.bind(this)
  }

  createElement (props) {
    this.local = xtend(this.local, props)

    return html`
      <div class="${styles}">
        <form onsubmit=${this.submit} target="_self" method="POST" id="mG61Hd"><div class="freebirdFormviewerViewFormCard"><div class="freebirdFormviewerViewAccentBanner freebirdAccentBackground"></div><div class="freebirdFormviewerViewFormContent "><div class="freebirdFormviewerViewNoPadding"><div class="freebirdFormviewerViewHeaderHeader"><div class="freebirdFormviewerViewHeaderTitleRow"></div><div jsname="F0H8Yc" class="freebirdCommonViewSecurequizSecureQuizBannerContainer"></div></div></div><div class="freebirdFormviewerViewItemList" role="list"><div role="listitem" class="freebirdFormviewerViewItemsItemItem freebirdFormviewerViewItemsTextTextItem" jsname="ibnC6b" jscontroller="rDGJeb" jsaction="sPvj8e:e4JwSe,vwKRrd;" data-required="true" data-item-id="162953423"><div class="freebirdFormviewerViewItemsItemItemHeader"><div class="freebirdFormviewerViewItemsItemItemTitleContainer"><div class="freebirdFormviewerViewItemsItemItemTitle freebirdCustomFont" dir="auto" role="heading" aria-level="2" aria-describedby="i.desc.162953423 i3">Name</div><div class="freebirdFormviewerViewItemsItemItemHelpText" id="i.desc.162953423" dir="auto"></div></div></div><div class="freebirdFormviewerViewItemsTextItemWrapper"><div class="quantumWizTextinputPaperinputEl freebirdFormviewerViewItemsTextShortText freebirdThemedInput modeLight" jscontroller="pxq3x" jsaction="clickonly:KjsqPd; focus:Jt1EX; blur:fpfTEe; input:Lg5SV;" jsshadow="" jsname="W85ice"><div class="quantumWizTextinputPaperinputMainContent exportContent"><div class="quantumWizTextinputPaperinputContentArea exportContentArea"><div class="quantumWizTextinputPaperinputInputArea"><input class="quantumWizTextinputPaperinputInput exportInput" jsname="YPqjbf" autocomplete="off" tabindex="0" aria-label="Name" focus aria-describedby="i.desc.162953423 i.err.162953423" name="entry.1438156232" value="" required="" dir="auto" data-initial-dir="auto" data-initial-value="" type="text"></div><div class="quantumWizTextinputPaperinputUnderline exportUnderline"></div><div jsname="XmnwAc" class="quantumWizTextinputPaperinputFocusUnderline exportFocusUnderline"></div></div></div><div class="quantumWizTextinputPaperinputCounterErrorHolder"><div jsname="ty6ygf" class="quantumWizTextinputPaperinputHint exportHint"></div></div></div></div><div class="freebirdFormviewerViewItemsItemGradingGradingBox freebirdFormviewerViewItemsItemGradingFeedbackBox" jsname="R7fTud"></div><div jsname="XbIQze" class="freebirdFormviewerViewItemsItemErrorMessage" id="i.err.162953423" role="alert"></div></div><div role="listitem" class="freebirdFormviewerViewItemsItemItem freebirdFormviewerViewItemsTextTextItem" jsname="ibnC6b" jscontroller="rDGJeb" jsaction="sPvj8e:e4JwSe,vwKRrd;" data-required="true" data-item-id="237898751"><div class="freebirdFormviewerViewItemsItemItemHeader"><div class="freebirdFormviewerViewItemsItemItemTitleContainer"><div class="freebirdFormviewerViewItemsItemItemTitle freebirdCustomFont" dir="auto" role="heading" aria-level="2" aria-describedby="i.desc.237898751 i6">Email address</div><div class="freebirdFormviewerViewItemsItemItemHelpText" id="i.desc.237898751" dir="auto"></div></div></div><div class="freebirdFormviewerViewItemsTextItemWrapper"><div class="quantumWizTextinputPaperinputEl freebirdFormviewerViewItemsTextShortText freebirdThemedInput modeLight" jscontroller="pxq3x" jsaction="clickonly:KjsqPd; focus:Jt1EX; blur:fpfTEe; input:Lg5SV;" jsshadow="" jsname="W85ice"><div class="quantumWizTextinputPaperinputMainContent exportContent"><div class="quantumWizTextinputPaperinputContentArea exportContentArea"><div class="quantumWizTextinputPaperinputInputArea"><input class="quantumWizTextinputPaperinputInput exportInput" type="email" jsname="YPqjbf" autocomplete="off" tabindex="0" aria-label="Email address" aria-describedby="i.desc.237898751 i.err.237898751" name="entry.947820825" value="" required="true" dir="auto" data-initial-dir="auto" data-initial-value=""></div><div class="quantumWizTextinputPaperinputUnderline exportUnderline"></div><div jsname="XmnwAc" class="quantumWizTextinputPaperinputFocusUnderline exportFocusUnderline"></div></div></div><div class="quantumWizTextinputPaperinputCounterErrorHolder"><div jsname="ty6ygf" class="quantumWizTextinputPaperinputHint exportHint"></div></div></div></div><div class="freebirdFormviewerViewItemsItemGradingGradingBox freebirdFormviewerViewItemsItemGradingFeedbackBox" jsname="R7fTud"></div><div jsname="XbIQze" class="freebirdFormviewerViewItemsItemErrorMessage" id="i.err.237898751" role="alert"></div></div><div role="listitem" class="freebirdFormviewerViewItemsItemItem freebirdFormviewerViewItemsTextTextItem" jsname="ibnC6b" jscontroller="rDGJeb" jsaction="sPvj8e:e4JwSe,vwKRrd;" data-item-id="723151533"><div class="freebirdFormviewerViewItemsItemItemHeader"><div class="freebirdFormviewerViewItemsItemItemTitleContainer"><div class="freebirdFormviewerViewItemsItemItemTitle freebirdCustomFont" dir="auto" role="heading" aria-level="2" aria-describedby="i.desc.723151533">Message</div><div class="freebirdFormviewerViewItemsItemItemHelpText" id="i.desc.723151533" dir="auto"></div></div></div><div class="quantumWizTextinputPapertextareaEl modeLight freebirdFormviewerViewItemsTextLongText freebirdThemedInput" jscontroller="pxq3x" jsaction="clickonly:KjsqPd; focus:Jt1EX; blur:fpfTEe; input:Lg5SV;" jsshadow="" jsname="W85ice"><div class="quantumWizTextinputPapertextareaMainContent exportContent"><div class="quantumWizTextinputPapertextareaContentArea exportContentArea"><textarea required class="quantumWizTextinputPapertextareaInput exportTextarea" jsname="YPqjbf" data-rows="1" tabindex="0" aria-label="Message" jscontroller="gZjhIf" jsaction="input:Lg5SV;ti6hGc:XMgOHc;rcuQ6b:WYd;" name="entry.1953681918" dir="auto" data-initial-dir="auto" data-initial-value="" aria-describedby="i.desc.723151533 i.err.723151533"></textarea></div><div class="quantumWizTextinputPapertextareaUnderline exportUnderline"></div><div jsname="XmnwAc" class="quantumWizTextinputPapertextareaFocusUnderline exportFocusUnderline"></div></div><div class="quantumWizTextinputPapertextareaCounterErrorHolder"><div jsname="ty6ygf" class="quantumWizTextinputPapertextareaHint exportHint"></div></div></div><div class="freebirdFormviewerViewItemsItemGradingGradingBox freebirdFormviewerViewItemsItemGradingFeedbackBox" jsname="R7fTud"></div><div jsname="XbIQze" class="freebirdFormviewerViewItemsItemErrorMessage" id="i.err.723151533" role="alert"></div></div></div><div class="freebirdFormviewerViewNavigationNavControls" jscontroller="lSvzH" jsaction="rcuQ6b:npT2md;JIbuQc:Gl574d(QR6bsb),V3upec(GeGHKb),HiUbje(M2UYVd),NPBnCf(OCpkoe);" data-shuffle-seed="-3058396699905173992" data-should-execute-invisible-captcha-challenge="false" data-is-receipt-checked="false"><div class="freebirdFormviewerViewNavigationButtonsAndProgress"><div class="freebirdFormviewerViewNavigationButtons"><div role="button" class="quantumWizButtonPaperbuttonEl quantumWizButtonPaperbuttonFlat quantumWizButtonPaperbuttonDark quantumWizButtonPaperbutton2El2 freebirdFormviewerViewNavigationSubmitButton" jscontroller="VXdfxd" jsaction="click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue;touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc(preventMouseEvents=true|preventDefault=true); touchcancel:JMtRjd;focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef;" jsshadow="" jsname="M2UYVd" aria-disabled="false" tabindex="0"><div class="quantumWizButtonPaperbuttonRipple exportInk" jsname="ksKsZd"></div><div class="quantumWizButtonPaperbuttonFocusOverlay exportOverlay"></div><content class="quantumWizButtonPaperbuttonContent"><button type="submit" value="submit" class="quantumWizButtonPaperbuttonLabel exportLabel">Send message</button></content></div></div></div></div><input name="fvv" value="1" type="hidden"><input name="draftResponse" value="[null,null,&quot;-3058396699905173992&quot;]" type="hidden"><input name="pageHistory" value="0" type="hidden"><input name="fbzx" value="-3058396699905173992" type="hidden"></div></div></form>
        <div class="step">Sending…</div>
      </div>
    `
  }

  submit (event) {
    var self = this
    var stepElement = this.element.querySelector('.step')
    event.preventDefault()
    stepElement.style.pointerEvents = 'auto'
    stepElement.style.opacity = 1
    xhr(this.local.action, {
      method: 'post',
      body: new FormData(this.element.querySelector('form'))
    }, function (err, resp, body) {
      stepElement.style.background = '#fff'
      stepElement.innerHTML = 'Sent! Expect a response within 48 hours.'
    })
  }

  update (props) {
    return false
  }
}
