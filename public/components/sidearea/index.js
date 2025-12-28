export const TAG_NAME ="my-" + (import.meta.url.replace(/^[a-z]+:\/\/[^/]+\/|\/[^/]*$/gi, "").replace(/\//g, "-") || "origin")
 
//    pointer-events: none;

const createHTML = () => /*html*/`
<style>
  :host{
    display: grid;
    grid-template-rows:    minmax(0,1fr);
    grid-template-columns: minmax(0,1fr);
    overflow: hidden;
    position: relative

    grid-row: 1/2;
    grid-column: 1/2;
  }
 
  div.slider{
    position:absolute;
    width: 20px;
    height: 100%;
    top: 0;
    left: -20px;
    background: yellow;
    display: flex; 
    align-items: center;
    justify-content: center;
    cursor: col-resize;
     user-select: none;
    -webkit-user-select: none; /* Chrome, Safari */
    -moz-user-select: none;    /* Firefox */
    -ms-user-select: none;     /* Internet Explorer */
  }
  div.draw{
    position:absolute;
    width: 50px;
    top: 0px;
    right: 0px;
    height: 100%;
    width: 500px;
    background: green;
  }
</style>
  <div class="draw">
    <div class="slider">::</div>
    <slot></slot>
  </div>
`

export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
  }
  connectedCallback() {
    console.log("connected callback of", TAG_NAME)
    const shadow = this.attachShadow({mode: 'open'})
    const HTML = createHTML()
    shadow.setHTMLUnsafe(HTML)
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
