import * as Person from "@/dataStore/person.js"
import {makeHTML} from "@/modules/template.js"
export const TAG_NAME = import.meta.url.split("/")?.slice(3,-1)?.join("-") ?? "origin"

const createHTML = () => `
<style>
  :host{
    --md-icon-button-icon-size: 48px;
    display: flex;
    align-items: center;
    gap: 40px;
  }
</style>
<md-icon-button name="download-btn">
  <md-icon>Description</md-icon>
</md-icon-button>
<md-icon-button>
  <md-icon>Construction</md-icon>
</md-icon-button>
<md-icon-button>
  <md-icon>Help</md-icon>
</md-icon-button>
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
    this.setElements()
  }
  setElements(){
    const download = this.shadow.querySelector("[name=download-btn]")
    download.onclick=async(e)=>{
      const data = Person.person.data
      const exportText = await makeHTML(data) 
      const filename = "index.html"
      const blob = new Blob([exportText], {type: 'text/plain; charset=utf-8'})
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = filename 
      a.click()
      a.remove()
    }
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
