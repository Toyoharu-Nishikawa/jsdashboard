import {customElemMap} from "@/dataStore/components.js"

export const TAG_NAME ="my-" + (import.meta.url.replace(/^[a-z]+:\/\/[^/]+\/|\/[^/]*$/gi, "").replace(/\//g, "-") || "origin")
//    grid-template-rows: 20px 1fr 20px;
//    grid-template-columns: 20px 1fr 20px;
 
const createHTML = () => /*html*/`
<style>
  :host{
    border: 1px solid #DCDCDC;
    background: #E6E6FA;
    grid-row: 1/2;
    grid-column: 1/2;
    display: grid;
    grid-template-rows: minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr);
  }
  ::slotted([name="item"]){
     grid-row: 2/3;
     grid-column: 2/3;
    background: blue;
  }
  div[name="outer"]{
    position:absolute;
    top:20px;
    left:20px;
    right:20px;
    bottom:20px;
    /*
    height:100%;
    width: 100%;
    display: grid;
    grid-template-rows: 20px 1fr 20px;
    grid-template-columns: 20px 1fr 20px;
    grid-row: 1/2;
    grid-column: 1/2;
    background: yellow;
    */
  }
  div[name="inner"]{
    background: red;
  }
/* 縁レイヤー（透明） */
.edge {
  position: absolute;
  background: transparent;
  pointer-events: auto; /* ← hover を拾う */
  z-index: 10; /* 子要素より上に置く */
}

/* 縁の幅（20px） */
.edge-top    { top: 0; left: 0; right: 0; height: 20px; }
.edge-bottom { bottom: 0; left: 0; right: 0; height: 20px; }
.edge-left   { top: 0; bottom: 0; left: 0; width: 20px; }
.edge-right  { top: 0; bottom: 0; right: 0; width: 20px; }

.edge-parent{
  background: #eeeeee;
  transition: background-color 0.5s ease; /* */
}

/* edge に hover したら親を光らせる */
.edge-parent:hover {
  /*filter: brightness(110%);*/
  cursor: move;
}
.edge-top {
  display: flex;
  align-items: center;
  justify-content: center;
}

.edge-top > .id-label {
  margin:0;
  padding: 0;
}
.close-button{
  position:absolute;
  right: 2px;
  top: -3px;
  cursor:pointer;
  z-index: 100;
}
.cross {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 1px;
  background: #808080;
  transform: rotate(45deg);
  vertical-align: middle;
}

.cross::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #808080;
  transform: rotate(90deg);
}

.close-button:hover .cross,
.close-button:hover .cross::before
{
  background: red;
}


</style>
<div class="edge-parent">
  <div class="edge edge-top"><p class="id-label"></p></div>
  <div class="edge edge-bottom"></div>
  <div class="edge edge-left"></div>
  <div class="edge edge-right"></div>
</div>
<div class="close-button"><span class="cross"></span></div>
<div name="outer">
   <slot name="item"></slot>
</div>
`

export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
  }
  connectedCallback() {
    console.log("connected callback of", TAG_NAME)
    const shadow = this.attachShadow({mode: 'open'});
    const HTML = createHTML()
    shadow.setHTMLUnsafe(HTML)
    this.shadow = shadow
    this.initialize()
  }
  initialize(){
    console.log("!!!! initialize()!!!")
    this.setElements()
  }
  setElements(){
    const idArea = this.shadowRoot.querySelector(".id-label")
    const closeButton = this.shadowRoot.querySelector(".close-button")
    this.elements = {idArea, closeButton}
  }
  addId(idLabel){
    this.elements.idArea.textContent = idLabel 
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
