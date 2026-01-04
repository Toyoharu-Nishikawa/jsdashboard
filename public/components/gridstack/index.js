import {collection} from "@/dataStore/collection.js"
import "@/node_modules/gridstack/dist/gridstack-all.js"
import gridstackCSS from "@/node_modules/gridstack/dist/gridstack.css" with { type: "css" }
import "@/node_modules/@shoelace-style/shoelace/cdn/shoelace.js"
import {cardMap} from "@/dataStore/components.js"
import shoelaceSheet from "@/node_modules/@shoelace-style/shoelace/dist/themes/light.css" with { type: "css" }
import "/neco-cdn/neco-material/index.js"

import {TAG_NAME as back} from "./back/index.js"

export const TAG_NAME ="my-" + (import.meta.url.replace(/^[a-z]+:\/\/[^/]+\/|\/[^/]*$/gi, "").replace(/\//g, "-") || "origin")


const createHTML = () => /*html*/`
<style>
:host{
  display: grid;
  grid-template-rows: minmax(0, 1fr);
  grid-template-columns: minmax(0, 1fr);
  grid-row: 1/2;
  grid-column: 1/2;
}
</style>

<style>
.grid-stack {
  min-height: 100% !important;
  overflow-y: scroll !important;
  height: auto !important;
  grid-column: 2/3;
  grid-row: 1/2;
  background: #D7EEFF;	
}

.cardArea{
  /*background: orange;*/
  display:grid; 
  width: 60px;
  height: 60px;
  grid-template-columns: 10px 1fr 10px;
  grid-template-rows   : 10px 1fr 10px;

  background: #98c0dfff;	
}

.card{
  /*background: red;*/
  grid-row:2/3;
  grid-column:2/3;
  width: 40px;
  height: 40px;
  border: 1px solid black;
  cursor: pointer;
  border-radius: 5px;

  background: #ffffff;	
}

.row{
  display:grid;
  grid-row : 1/2;
  grid-column : 1/2;
  grid-template-rows: minmax(0,1fr);
  grid-template-columns: 60px 1fr;
}
.sidepanel{
  display: flex; 
  flex-direction: column;
  background: #8eb2ceff;	
}
</style>

<div class="row">
  <!-- icon -->
  <div class="sidepanel col-md-2 d-none d-md-block">
    <div class="cardArea">
      <sl-tooltip content="plotly.js" trigger="hover" placement="right">
        <md-icon data-card="neco-plotly" class="grid-stack-item card" gs-w="4" gs-h="3">show_chart</md-icon>
      </sl-tooltip>
    </div>
    <div class="cardArea">
      <sl-tooltip content="jspreadsheet.js" trigger="hover" placement="right">
        <md-icon data-card="neco-jspreadsheet" class="grid-stack-item card" gs-w="4" gs-h="3">table</md-icon>
      </sl-tooltip>
    </div>
    <div class="cardArea">
      <sl-tooltip content="minijscad" trigger="hover" placement="right">
        <md-icon data-card="neco-minijscad" class="grid-stack-item card" gs-w="4" gs-h="3">2d</md-icon>
      </sl-tooltip>
    </div>
    <div class="cardArea">
      <sl-tooltip content="three.js" trigger="hover" placement="right">
        <md-icon data-card="neco-three" class="grid-stack-item card" gs-w="4" gs-h="3">3d</md-icon>
      </sl-tooltip>
    </div>
    <div class="cardArea">
      <sl-tooltip content="button" trigger="hover" placement="right">
        <md-icon data-card="sl-button" data-text="button" class="grid-stack-item card" gs-w="2" gs-h="1">call_to_action</md-icon>
      </sl-tooltip>
    </div>
    <div class="cardArea">
      <sl-tooltip content="switch" trigger="hover" placement="right">
        <md-icon data-card="md-switch" data-text="" class="grid-stack-item card" gs-w="1" gs-h="1">toggle_off</md-icon>
      </sl-tooltip>
    </div>
    <div class="cardArea">
      <sl-tooltip content="input" trigger="hover" placement="right">
        <md-icon data-card="sl-input" data-text="" class="grid-stack-item card" gs-w="2" gs-h="1">input</md-icon>
      </sl-tooltip>
    </div>
    <div class="cardArea">
      <sl-tooltip content="slider" trigger="hover" placement="right">
        <md-icon data-card="md-slider" data-text="" class="grid-stack-item card" gs-w="2" gs-h="1">sliders</md-icon>
      </sl-tooltip>
    </div>

  </div>

  <!-- dashboard -->
  <div class="grid-stack"></div>
</div>
`

export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
  }
  connectedCallback(){
    console.log("connected callback of", TAG_NAME)
    const shadow = this.attachShadow({mode: 'open'});
    const HTML = createHTML()
    shadow.setHTMLUnsafe(HTML)
    this.shadowRoot.adoptedStyleSheets = [gridstackCSS,shoelaceSheet]

    this.shadow = shadow
    this.initialize()
  }
  initialize(){
    this.grid = GridStack.init(
      {
//          column: 12, 
          maxRow: 0, 
          acceptWidgets: true,
          disableOneColumnMode: true,
//        cellHeight: 80,
      },
      this.shadow.querySelector('.grid-stack')
    )
    this.setEvents()
    collection.subscribe(this.save.bind(this))
    collection.subscribe(this.load.bind(this))
  }
  setEvents(){
    this.grid.engine._updateContainerHeight = ()=> {}
      // 外部ドラッグ可能にする
    const cardElems = this.shadowRoot.querySelectorAll('.card')
    GridStack.setupDragIn(cardElems, {
      revert: 'invalid',
      scroll: false,
      helper: 'clone'
    })
    this.grid.on('dropped', (event, previousWidget, newWidget) => {
      const cardName = newWidget.el.dataset.card
      const text = newWidget.el.dataset.text
      const grid = newWidget.grid
      const {x,y,w,h} = newWidget
      const res = grid.removeWidget(newWidget.el,true)
      const option = {x,y,w,h,text}
      const idOption = null
      this.addCard(cardName, option,idOption)
    })
  }
  addCard(cardName, option, idOption){
    const widget  = document.createElement("div")
    widget.classList.add('grid-stack-item');
 
    const content = document.createElement(back)
    content.classList.add('grid-stack-item-content')

    const item = document.createElement(cardName)
    item.setAttribute("name","item")
    item.setAttribute("slot","item")
    if(option.text)item.innerHTML = option.text
    item.style.width  = "100%"
    item.style.height = "100%"
    content.appendChild(item)
    widget.setAttribute('gs-w', option.w)
    widget.setAttribute('gs-h', option.h)
    widget.setAttribute('gs-x', option.x)
    widget.setAttribute('gs-y', option.y)
    widget.appendChild(content)
   
    this.grid.addWidget(widget, option)
    //this.grid.addWidget(widget, mergedOption)
    const idCounter = collection.data.idCounter || 0
    const idLabel = idOption ? idOption: "id" + idCounter
    cardMap.set(idLabel, {elem: item, cardName, option, widget})
    const newIdCounter = idCounter + 1
 
    const removeElem = (e) => {
      this.grid.removeWidget(widget,true)
      cardMap.delete(idLabel)
    }
    content.elements.closeButton.onclick = removeElem.bind(this)
 
    const elems = content.shadowRoot.querySelector("slot[name='item']").assignedElements()
    elems[0].onmousedown =  (event)=> event.stopPropagation()

    content.addId(idLabel)
    collection.data.idCounter = newIdCounter 

    //addToLoacalStorage("jsDashboardRecord", "idCounter", newIdCounter)
  }
  save(data,key,value){
    if(key!=="saveCounter")return
    const layout = [...cardMap.entries()]
      .map(v=>{
        const idLabel =  v[0]
        const cardName = v[1].cardName
        const widget = v[1].widget
        const {x,y,w,h} = widget.gridstackNode
        const text = v[1].option.text
        const option = {x, y, w, h, text}
        const list = [idLabel, {cardName, option}]
        return list
      })

    collection.data.layout = layout
  }
  load(data, key, value){
    if(key!=="readCounter")return
    const layout = data.layout
    if(!Array.isArray(layout)){
      collection.data.idCounter = 0 
      return
    }
    this.grid.removeAll();

    layout.forEach(v=>{
      const idLabel  = v[0]
      const cardName = v[1].cardName
      const option = v[1].option
      this.addCard(cardName, option, idLabel)
    })
    const idList = layout.map(v=>v[0])
      .map(v=>v.match(/^id(\d+)/)[1])
      .map(v=>parseInt(v))
    const maxId = idList.length ==0 ? 0 : Math.max(...idList)
    collection.data.idCounter = maxId + 1
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
