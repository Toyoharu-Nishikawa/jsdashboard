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
</style>
<div name="outer">
   <slot name="item"></slot>
</div>
`
//</div>

//  <slot></slot>

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
    //const elems = shadow.querySelector("slot[name='item']").assignedElements()
    //console.log("!!!elems!!!",elems)
    //elems[0].onmousedown =  (event)=> {
    //  console.log('親要素がクリックされました');
    //  event.stopPropagation();
    //}
    ////shadow.querySelector("div[name='outter']").addEventListener('click', function(event) {
    //shadow.querySelector("div[name='outter']").addEventListener('mousedown', function(event) {
    //  console.log('親要素がクリックされました');
    //  event.stopPropagation();
    //});
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
