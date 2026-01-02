import {importFiles} from "/neco-cdn/filereader/index.js"
import {collection} from "@/dataStore/collection.js"
import "@/node_modules/@shoelace-style/shoelace/cdn/shoelace.js"
import shoelaceSheet from "@/node_modules/@shoelace-style/shoelace/dist/themes/light.css" with { type: "css" }
import {saveStringAsFile} from "@/modules/save.js"

export const TAG_NAME ="my-" + (import.meta.url.replace(/^[a-z]+:\/\/[^/]+\/|\/[^/]*$/gi, "").replace(/\//g, "-") || "origin")

const createHTML = () => /*html*/`
<style>
  :host{
    --md-icon-button-icon-size: 48px;
    display: flex;
    align-items: center;
    gap: 40px;
  }
</style>
<sl-dropdown>
  <sl-button slot="trigger" caret>Files</sl-button>
  <sl-menu name="menu">
    <sl-menu-item value="Read" name="readBtn">
      Read
      <input type="file" name="files" style="display:none; multiple=multiple">
    </sl-menu-item>
    <sl-menu-item value="Save" name="saveBtn">Save</sl-menu-item>
    <sl-menu-item value="Import" name="importBtn">
      Import
      <input type="file" name="files" style="display:none; multiple=multiple">
    </sl-menu-item>
    <sl-menu-item value="Export" name="exportBtn">Export</sl-menu-item>
    <sl-menu-item value="Register" name="registerBtn">Register</sl-menu-item>
  </sl-menu>
</sl-dropdown>
<sl-button name="runBtn">Run</sl-button>
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
    this.shadowRoot.adoptedStyleSheets = [shoelaceSheet]
    this.shadow = shadow
    this.initialize()
  }
  initialize(){
    this.setElements()
  }
  setElements(){
    const menu        = this.shadow.querySelector("[name=menu]")
    const runBtn      = this.shadow.querySelector("[name=runBtn]")
    const readBtn     = this.shadow.querySelector("[name=readBtn]")
    const saveBtn     = this.shadow.querySelector("[name=saveBtn]")
    const importBtn   = this.shadow.querySelector("[name=importBtn]")
    const exportBtn   = this.shadow.querySelector("[name=exportBtn]")
    const registerBtn = this.shadow.querySelector("[name=registerBtn]")
    runBtn.onclick  = this.run
    readBtn.onclick = this.read.bind(this)
    saveBtn.onclick = this.save.bind(this)
    importBtn.onclick = this.import.bind(this)
    exportBtn.onclick = this.export.bind(this)
    this.elements = {menu, runBtn,readBtn,saveBtn,importBtn,exportBtn,registerBtn} 
  }
  run(){
    collection.data.runCounter +=1
  }
  async read(e){
    console.log(e.target)
    const readFileElem = e.target.querySelector("input")
    const files = await importFiles(readFileElem)
    const file = files[0]
    const filename = file.filename
    const text = file.text
    console.log("readed", filename)

    collection.data.fileName = filename
    const data = JSON.parse(text)
    collection.data.layout = data.layout
    collection.data.code   = data.code
    collection.data.readCounter +=1
  }
  async save(){
    collection.data.saveCounter +=1
  }
  async import(e){
    console.log(e.target)
    const readFileElem = e.target.querySelector("input")
    const files = await importFiles(readFileElem)
    window.importTexts = files

    collection.data.importCounter +=1
  }
  export(){
    const exportText = window.exportText
    const exportFileName = window.exportFileName
    saveStringAsFile(exportText, exportFileName)

    collection.data.exportCounter +=1
  }

}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
