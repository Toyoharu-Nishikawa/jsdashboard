import {collection} from "@/dataStore/collection.js"
import {TAG_NAME as monaco} from "./monaco/index.js"

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
    background:#3c3c3c;
    color: white;
    display: flex; 
    align-items: center;
    justify-content: center;
    cursor: col-resize;
    user-select: none;
    -webkit-user-select: none; /* Chrome, Safari */
    -moz-user-select:     /* Firefox */
    -ms-user-select: none;     /* Internet Explorer */
  }
  div.drawArea{
    position:absolute;
    width: 50px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    grid-row: 1/2;
    display: grid;
    grid-template-rows:    minmax(0,1fr);
    grid-template-columns: minmax(0,1fr);
    width: 500px;
    background: green;
    transition: opacity 0.5s ease, visibility 0.5s ease;
  }
  ${monaco}{
    grid-row: 1/2;
    grid-column: 1/2;
  }
</style>
  <div class="drawArea">
    <div class="slider">::</div>
    <${monaco}></${monaco}>
  </div>
`

export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
    this.drawBoxWidth = 500
  }
  connectedCallback() {
    console.log("connected callback of", TAG_NAME)
    const shadow = this.attachShadow({mode: 'open'})
    const HTML = createHTML()
    shadow.setHTMLUnsafe(HTML)
    this.shadow = shadow
    this.initialize()
  }
  initialize(){
    this.setElem()
    collection.subscribe(this.draw.bind(this))
  }
  setElem(){
    const drawArea = this.shadow.querySelector("div.drawArea")
    const slider = this.shadow.querySelector("div.slider")
    const elements = {drawArea,slider}
    this.elements = elements


    const mouseMove = (e)=>{
      const currentX =  e.clientX;
      this.drawBoxWidth = this.originalX - currentX + this.originalWidth;
      elements.drawArea.style.width = this.drawBoxWidth + "px";
      //elements.drawArea.style.width = drawBoxWidth + "px";
    }
    const bindedMouseMove = mouseMove.bind(this)

    const mouseDown = (e)=>{
      this.flag = true;
      this.originalX =  e.clientX;
      this.originalWidth =  this.drawBoxWidth
      document.body.addEventListener("mousemove",bindedMouseMove)
      //document.body.onmousemove= mouseMove.bind(this)
    }
    const mouseUp = (e)=>{
      document.body.removeEventListener("mousemove", bindedMouseMove)
      //document.body.onmousemove = null
      this.originalWidth =  null
      this.flag = false
      //this.remove(this.element)
      //document.body.onmousemove = mouseMove.bind(this)
    }
    slider.onmousedown = mouseDown.bind(this)
    document.body.onmouseup = mouseUp.bind(this)
  }
  draw(data, key, value){
    if(key!=="drawAreaVisible")return
    const drawArea = this.elements.drawArea
    if(!value){
      drawArea.style.visibility ="hidden"
      drawArea.style.opacity = 0 
    }
    else{
      drawArea.style.visibility ="visible"
      drawArea.style.opacity = 1
    }
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
