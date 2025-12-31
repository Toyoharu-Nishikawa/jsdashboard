import "@/node_modules/gridstack/dist/gridstack-all.js"
import {cardMap} from "@/dataStore/components.js"
import {collection} from "@/dataStore/collection.js"

import {TAG_NAME as back} from "./back/index.js"

export const TAG_NAME ="my-" + (import.meta.url.replace(/^[a-z]+:\/\/[^/]+\/|\/[^/]*$/gi, "").replace(/\//g, "-") || "origin")

//<link href="./node_modules/gridstack/dist/gridstack.min.css" rel="stylesheet"/>
//<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gridstack/dist/gridstack.min.css">
//<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gridstack/dist/gridstack-extra.min.css">


const createHTML = () => /*html*/`
<style>
.grid-stack {
  position: relative;
}

.grid-stack-rtl {
  direction: ltr;
}
.grid-stack-rtl > .grid-stack-item {
  direction: rtl;
}

.grid-stack-placeholder > .placeholder-content {
  background-color: rgba(0, 0, 0, 0.1);
  margin: 0;
  position: absolute;
  width: auto;
  z-index: 0 !important;
}

.grid-stack > .grid-stack-item {
  position: absolute;
  padding: 0;
  top: 0;
  left: 0;
  width: var(--gs-column-width);
  height: var(--gs-cell-height);
}
.grid-stack > .grid-stack-item > .grid-stack-item-content {
  margin: 0;
  position: absolute;
  width: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
.grid-stack > .grid-stack-item.size-to-content:not(.size-to-content-max) > .grid-stack-item-content {
  overflow-y: hidden;
}

.grid-stack > .grid-stack-item > .grid-stack-item-content,
.grid-stack > .grid-stack-placeholder > .placeholder-content {
  top: var(--gs-item-margin-top);
  right: var(--gs-item-margin-right);
  bottom: var(--gs-item-margin-bottom);
  left: var(--gs-item-margin-left);
}

.grid-stack-item > .ui-resizable-handle {
  position: absolute;
  font-size: 0.1px;
  display: block;
  -ms-touch-action: none;
  touch-action: none;
}
.grid-stack-item.ui-resizable-disabled > .ui-resizable-handle, .grid-stack-item.ui-resizable-autohide > .ui-resizable-handle {
  display: none;
}
.grid-stack-item > .ui-resizable-ne,
.grid-stack-item > .ui-resizable-nw,
.grid-stack-item > .ui-resizable-se,
.grid-stack-item > .ui-resizable-sw {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="%23666" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 20 20"><path d="m10 3 2 2H8l2-2v14l-2-2h4l-2 2"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
}
.grid-stack-item > .ui-resizable-ne {
  transform: rotate(45deg);
}
.grid-stack-item > .ui-resizable-sw {
  transform: rotate(45deg);
}
.grid-stack-item > .ui-resizable-nw {
  transform: rotate(-45deg);
}
.grid-stack-item > .ui-resizable-se {
  transform: rotate(-45deg);
}
.grid-stack-item > .ui-resizable-nw {
  cursor: nw-resize;
  width: 20px;
  height: 20px;
  top: var(--gs-item-margin-top);
  left: var(--gs-item-margin-left);
}
.grid-stack-item > .ui-resizable-n {
  cursor: n-resize;
  height: 10px;
  top: var(--gs-item-margin-top);
  left: 25px;
  right: 25px;
}
.grid-stack-item > .ui-resizable-ne {
  cursor: ne-resize;
  width: 20px;
  height: 20px;
  top: var(--gs-item-margin-top);
  right: var(--gs-item-margin-right);
}
.grid-stack-item > .ui-resizable-e {
  cursor: e-resize;
  width: 10px;
  top: 15px;
  bottom: 15px;
  right: var(--gs-item-margin-right);
}
.grid-stack-item > .ui-resizable-se {
  cursor: se-resize;
  width: 20px;
  height: 20px;
  bottom: var(--gs-item-margin-bottom);
  right: var(--gs-item-margin-right);
}
.grid-stack-item > .ui-resizable-s {
  cursor: s-resize;
  height: 10px;
  left: 25px;
  bottom: var(--gs-item-margin-bottom);
  right: 25px;
}
.grid-stack-item > .ui-resizable-sw {
  cursor: sw-resize;
  width: 20px;
  height: 20px;
  bottom: var(--gs-item-margin-bottom);
  left: var(--gs-item-margin-left);
}
.grid-stack-item > .ui-resizable-w {
  cursor: w-resize;
  width: 10px;
  top: 15px;
  bottom: 15px;
  left: var(--gs-item-margin-left);
}
.grid-stack-item.ui-draggable-dragging > .ui-resizable-handle {
  display: none !important;
}
.grid-stack-item.ui-draggable-dragging {
  will-change: left, top;
}
.grid-stack-item.ui-resizable-resizing {
  will-change: width, height;
}

.ui-draggable-dragging,
.ui-resizable-resizing {
  z-index: 10000;
}
.ui-draggable-dragging > .grid-stack-item-content,
.ui-resizable-resizing > .grid-stack-item-content {
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.2);
  opacity: 0.8;
}

.grid-stack-animate,
.grid-stack-animate .grid-stack-item {
  transition: left 0.3s, top 0.3s, height 0.3s, width 0.3s;
}

.grid-stack-animate .grid-stack-item.ui-draggable-dragging,
.grid-stack-animate .grid-stack-item.ui-resizable-resizing,
.grid-stack-animate .grid-stack-item.grid-stack-placeholder {
  transition: left 0s, top 0s, height 0s, width 0s;
}

.grid-stack > .grid-stack-item[gs-y="0"] {
  top: 0px;
}

.grid-stack > .grid-stack-item[gs-x="0"] {
  left: 0%;
}
</style>

<style>
  :host{
   grid-row: 1/2;
   grid-column: 1/2;
  }
  .grid-stack-item-content {
    background: #eee;
    border-radius: 4px;
  }

.sidebar {
  background: rgb(215, 243, 215);
  padding: 25px 0;
  height: 100px;
  text-align: center;
}
.sidebar > .grid-stack-item,
.sidebar-item {
  width: 100px;
  height: 50px;
  border: 2px dashed green;
  text-align: center;
  line-height: 35px;
  background: rgb(192, 231, 192);
  cursor: default;
  display: inline-block;
}

.grid-stack {
  background: #FAFAD2;
}
.grid-stack.grid-stack-static {
  background: #eee;
}

.sidebar > .grid-stack-item,
.grid-stack-item-content {
  text-align: center;
  background-color: #18bc9c;
}

.card-header {
  margin: 0;
  cursor: move;
  min-height: 25px;
  background-color: #16af91;
}
.card-header:hover {
  background-color: #149b80;
}

.ui-draggable-disabled.ui-resizable-disabled > .grid-stack-item-content {
  background-color: #777;
}

.grid-stack-item-removing {
  opacity: 0.5;
}
.trash {
  height: 100px;
  background: rgba(255, 0, 0, 0.1) center center url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDQzOC41MjkgNDM4LjUyOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDM4LjUyOSA0MzguNTI5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQxNy42ODksNzUuNjU0Yy0xLjcxMS0xLjcwOS0zLjkwMS0yLjU2OC02LjU2My0yLjU2OGgtODguMjI0TDMwMi45MTcsMjUuNDFjLTIuODU0LTcuMDQ0LTcuOTk0LTEzLjA0LTE1LjQxMy0xNy45ODkgICAgQzI4MC4wNzgsMi40NzMsMjcyLjU1NiwwLDI2NC45NDUsMGgtOTEuMzYzYy03LjYxMSwwLTE1LjEzMSwyLjQ3My0yMi41NTQsNy40MjFjLTcuNDI0LDQuOTQ5LTEyLjU2MywxMC45NDQtMTUuNDE5LDE3Ljk4OSAgICBsLTE5Ljk4NSw0Ny42NzZoLTg4LjIyYy0yLjY2NywwLTQuODUzLDAuODU5LTYuNTY3LDIuNTY4Yy0xLjcwOSwxLjcxMy0yLjU2OCwzLjkwMy0yLjU2OCw2LjU2N3YxOC4yNzQgICAgYzAsMi42NjQsMC44NTUsNC44NTQsMi41NjgsNi41NjRjMS43MTQsMS43MTIsMy45MDQsMi41NjgsNi41NjcsMi41NjhoMjcuNDA2djI3MS44YzAsMTUuODAzLDQuNDczLDI5LjI2NiwxMy40MTgsNDAuMzk4ICAgIGM4Ljk0NywxMS4xMzksMTkuNzAxLDE2LjcwMywzMi4yNjQsMTYuNzAzaDIzNy41NDJjMTIuNTY2LDAsMjMuMzE5LTUuNzU2LDMyLjI2NS0xNy4yNjhjOC45NDUtMTEuNTIsMTMuNDE1LTI1LjE3NCwxMy40MTUtNDAuOTcxICAgIFYxMDkuNjI3aDI3LjQxMWMyLjY2MiwwLDQuODUzLTAuODU2LDYuNTYzLTIuNTY4YzEuNzA4LTEuNzA5LDIuNTctMy45LDIuNTctNi41NjRWODIuMjIxICAgIEM0MjAuMjYsNzkuNTU3LDQxOS4zOTcsNzcuMzY3LDQxNy42ODksNzUuNjU0eiBNMTY5LjMwMSwzOS42NzhjMS4zMzEtMS43MTIsMi45NS0yLjc2Miw0Ljg1My0zLjE0aDkwLjUwNCAgICBjMS45MDMsMC4zODEsMy41MjUsMS40Myw0Ljg1NCwzLjE0bDEzLjcwOSwzMy40MDRIMTU1LjMxMUwxNjkuMzAxLDM5LjY3OHogTTM0Ny4xNzMsMzgwLjI5MWMwLDQuMTg2LTAuNjY0LDguMDQyLTEuOTk5LDExLjU2MSAgICBjLTEuMzM0LDMuNTE4LTIuNzE3LDYuMDg4LTQuMTQxLDcuNzA2Yy0xLjQzMSwxLjYyMi0yLjQyMywyLjQyNy0yLjk5OCwyLjQyN0gxMDAuNDkzYy0wLjU3MSwwLTEuNTY1LTAuODA1LTIuOTk2LTIuNDI3ICAgIGMtMS40MjktMS42MTgtMi44MS00LjE4OC00LjE0My03LjcwNmMtMS4zMzEtMy41MTktMS45OTctNy4zNzktMS45OTctMTEuNTYxVjEwOS42MjdoMjU1LjgxNVYzODAuMjkxeiIgZmlsbD0iI2ZmOWNhZSIvPgoJCTxwYXRoIGQ9Ik0xMzcuMDQsMzQ3LjE3MmgxOC4yNzFjMi42NjcsMCw0Ljg1OC0wLjg1NSw2LjU2Ny0yLjU2N2MxLjcwOS0xLjcxOCwyLjU2OC0zLjkwMSwyLjU2OC02LjU3VjE3My41ODEgICAgYzAtMi42NjMtMC44NTktNC44NTMtMi41NjgtNi41NjdjLTEuNzE0LTEuNzA5LTMuODk5LTIuNTY1LTYuNTY3LTIuNTY1SDEzNy4wNGMtMi42NjcsMC00Ljg1NCwwLjg1NS02LjU2NywyLjU2NSAgICBjLTEuNzExLDEuNzE0LTIuNTY4LDMuOTA0LTIuNTY4LDYuNTY3djE2NC40NTRjMCwyLjY2OSwwLjg1NCw0Ljg1MywyLjU2OCw2LjU3QzEzMi4xODYsMzQ2LjMxNiwxMzQuMzczLDM0Ny4xNzIsMTM3LjA0LDM0Ny4xNzJ6IiBmaWxsPSIjZmY5Y2FlIi8+CgkJPHBhdGggZD0iTTIxMC4xMjksMzQ3LjE3MmgxOC4yNzFjMi42NjYsMCw0Ljg1Ni0wLjg1NSw2LjU2NC0yLjU2N2MxLjcxOC0xLjcxOCwyLjU2OS0zLjkwMSwyLjU2OS02LjU3VjE3My41ODEgICAgYzAtMi42NjMtMC44NTItNC44NTMtMi41NjktNi41NjdjLTEuNzA4LTEuNzA5LTMuODk4LTIuNTY1LTYuNTY0LTIuNTY1aC0xOC4yNzFjLTIuNjY0LDAtNC44NTQsMC44NTUtNi41NjcsMi41NjUgICAgYy0xLjcxNCwxLjcxNC0yLjU2OCwzLjkwNC0yLjU2OCw2LjU2N3YxNjQuNDU0YzAsMi42NjksMC44NTQsNC44NTMsMi41NjgsNi41N0MyMDUuMjc0LDM0Ni4zMTYsMjA3LjQ2NSwzNDcuMTcyLDIxMC4xMjksMzQ3LjE3MnogICAgIiBmaWxsPSIjZmY5Y2FlIi8+CgkJPHBhdGggZD0iTTI4My4yMiwzNDcuMTcyaDE4LjI2OGMyLjY2OSwwLDQuODU5LTAuODU1LDYuNTctMi41NjdjMS43MTEtMS43MTgsMi41NjItMy45MDEsMi41NjItNi41N1YxNzMuNTgxICAgIGMwLTIuNjYzLTAuODUyLTQuODUzLTIuNTYyLTYuNTY3Yy0xLjcxMS0xLjcwOS0zLjkwMS0yLjU2NS02LjU3LTIuNTY1SDI4My4yMmMtMi42NywwLTQuODUzLDAuODU1LTYuNTcxLDIuNTY1ICAgIGMtMS43MTEsMS43MTQtMi41NjYsMy45MDQtMi41NjYsNi41Njd2MTY0LjQ1NGMwLDIuNjY5LDAuODU1LDQuODUzLDIuNTY2LDYuNTdDMjc4LjM2NywzNDYuMzE2LDI4MC41NSwzNDcuMTcyLDI4My4yMiwzNDcuMTcyeiIgZmlsbD0iI2ZmOWNhZSIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=) no-repeat;
}

/* make nested grid have slightly darker bg take almost all space (need some to tell them apart) so items inside can have similar to external size+margin */
.grid-stack > .grid-stack-item.grid-stack-sub-grid > .grid-stack-item-content {
  background: rgba(0,0,0,0.1);
  inset: 0 2px;
}
.grid-stack.grid-stack-nested {
  background: none;
  inset: 0;
}

.grid-stack.show-dimensions .grid-stack-item:after {
   content: '1x1';
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   padding: 2px;
   color: black;
   background-color: white;
   pointer-events: none; /* to not interfere with dragging the item */
}

.grid-stack.show-dimensions .grid-stack-item[gs-h]::after {
   content: '1x' attr(gs-h);
}

.grid-stack.show-dimensions .grid-stack-item[gs-w]::after {
   content: attr(gs-w) 'x1';
}

.grid-stack.show-dimensions .grid-stack-item[gs-h][gs-w]::after {
   content: attr(gs-w) 'x' attr(gs-h);
}

</style>
<div class="grid-stack">
</div>
`

//  <div class="grid-stack-item" gs-w="4" gs-h="2">
//<neco-three class="grid-stack-item-content" style="background:#ddd;">カード</neco-three>
//  </div>

export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
  }
  connectedCallback(){
    console.log("connected callback of", TAG_NAME)
    const shadow = this.attachShadow({mode: 'open'});
    const HTML = createHTML()
    shadow.setHTMLUnsafe(HTML)
    this.shadow = shadow
    this.initialize()
  }
  initialize(){
    this.grid = GridStack.init(
      {
//        draggable: {
//          handle: '.grid-stack-item-content'
//        },
//        resizable: {
//          handles: 'all'
//        }
//        float: true,
//        cellHeight: 80,
//        disableOneColumnMode: true
      },
      this.shadow.querySelector('.grid-stack')
    )
    collection.subscribe(this.draw.bind(this))

    this.draw(null,"card","neco-minijscad")
    this.draw(null,"card","neco-three")
  }
  draw(data,key, value){
    if(key!=="card")return

    const items = [
//      {content: 'my first widget'}, // will default to location (0,0) and 1x1
//      {w: 1, content: 'another longer widget!'}, // will be placed next at (1,0) and 2x1
      //{content: '<neco-minijscad></neco-minijscad>'}, // will default to location (0,0) and 1x1
    ];
    //const widget = document.createElement(back)
   // widget.classList.add('grid-stack-item');
    //widget.setAttribute('gs-w', '3');
    //widget.setAttribute('gs-h', '3');
//    const item = document.createElement(value)
//    item.setAttribute("name","item")
//    item.setAttribute("slot","item")
//    item.classList.add('grid-stack-item-content')
//    widget.appendChild(item)
//

    const content = document.createElement(back)
    content.classList.add('grid-stack-item-content')
    const item = document.createElement(value)
    //const item = document.createElement("div")
    item.setAttribute("name","item")
    item.setAttribute("slot","item")
    content.appendChild(item)
    content.style.background="orange"
    content.style.display="grid"
    content.style.gridTemplateRows="minmax(0,1fr)"
    content.style.gridTemplateColumns="minmax(0,1fr)"
    content.style.gridRow="1/2"
    content.style.gridColumn="1/2"
    //content.style.overflow="hidden"

    const widget  = document.createElement("div")
    widget.style.display="grid"
    widget.style.gridTemplateRows="minmax(0,1fr)"
    widget.style.gridTemplateColumns="minmax(0,1fr)"


    widget.classList.add('grid-stack-item');
    widget.setAttribute('gs-w', '4');
    widget.setAttribute('gs-h', '4');
    widget.appendChild(content)

//    this.grid.load(items);
    this.grid.addWidget(widget)

    const elems = content.shadowRoot.querySelector("slot[name='item']").assignedElements()
    elems[0].onmousedown =  (event)=> {
      console.log('親要素がクリックされました');
      event.stopPropagation();
    }

    const idCounter = collection.data.idCounter
    const id = "id" + idCounter
    //cardMap.set(id, {elem: item})
    collection.data.idCounter += 1
  } 
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
