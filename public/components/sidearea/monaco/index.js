import {CustomElem as NecoMonaco} from "/neco-cdn/neco-monaco/monaco-editor-wc.js"
import {isJSON} from "@/modules/utility.js"
import sheet from "/neco-cdn/neco-monaco/index.css" with { type: "css" }

import {collection} from "@/dataStore/collection.js"
import {addToLoacalStorage} from "@/modules/utility.js"

const tsWorker     = "/neco-cdn/neco-monaco/ts.worker-CMbG-7ft.js"
const editorWorker = "/neco-cdn/neco-monaco/editor.worker-Be8ye1pW.js"


self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "typescript" || label === "javascript") {
      return new Worker(new URL(tsWorker, import.meta.url),{ type: 'module' });
    }
    return new Worker(new URL(editorWorker, import.meta.url),{ type: 'module' });
  }
};


export const TAG_NAME ="my-" + (import.meta.url.replace(/^[a-z]+:\/\/[^/]+\/|\/[^/]*$/gi, "").replace(/\//g, "-") || "origin")

export const CustomElem = class extends NecoMonaco {
  constructor(){
    super()
//    this.objMap = new Map()
//    this.count = 0
  }
  connectedCallback(){
    super.connectedCallback()
    this.shadowRoot.adoptedStyleSheets = [sheet];
    console.log("connected callback of ", TAG_NAME)
    this.initialize()
  }
  initialize(){
    const editor = this.editor
    editor.updateOptions({
      fontSize: 18 
    });

    this.setEvent()
    collection.subscribe(this.draw.bind(this))
  }
  setEvent(){
//    reaction.subscribe(this.draw.bind(this)) 
//    reaction.subscribe(this.clear.bind(this)) 
    this.shadowRoot.addEventListener("keydown",this.keyBind.bind(this),{capture:true})    
    this.shadowRoot.addEventListener("wheel",this.wheelBind.bind(this),{ capture:true,passive: false })    
  }
  keyBind(e){
    if(e.shiftKey && e.key === 'Tab'){
      e.preventDefault()
      const drawAreaVisible = !collection.data.drawAreaVisible
      collection.data.drawAreaVisible = drawAreaVisible
      addToLoacalStorage("jsDashboardRecord", "drawAreaVisible", drawAreaVisible)
    }
    if(e.shiftKey && e.key === 'Enter'){
      e.stopPropagation()
      e.preventDefault()
      const code = this.editor.getValue()
      const runCounter = collection.data.runCounter  || 0
      const newRunCounter = runCounter + 1
      collection.data.code = code
      collection.data.runCounter = newRunCounter
      //addToLoacalStorage("jsDashboardRecord", "code", code)
    }
    if(e.ctrlKey && e.altKey && e.key === 'k'){
      e.preventDefault()
      const mode = this.getAttribute("mode")
      if(mode){
        this.setAttribute("mode","")
      }
      else{
        this.setAttribute("mode","vim")
      }
      const item = window.localStorage.getItem("jsDashboardRecord") 
      const data = isJSON(item) ? JSON.parse(item): {}
      const keyBind = mode ? "" : "vim"

      addToLoacalStorage("jsDashboardRecord", "keyBind", keyBind)
      collection.data.keyBind = keyBind
    }
  } 
  wheelBind(e){
    if (e.ctrlKey) {
      e.preventDefault(); // 必要ならブラウザのズームを防ぐ
      const monaco = this.monaco
      const current = this.editor.getOption(monaco.editor.EditorOption.fontSize);
      const fontSize = e.deltaY < 0 ? current + 1 : current - 1;
      this.editor.updateOptions({ fontSize });

      addToLoacalStorage("jsDashboardRecord", "fontSize", fontSize)
      collection.data.fontSize = fontSize
    }
  }
  draw(data,key,value){
    if(key == "code" || key=="readCounter"){
      const collectionCode  = data.code
      const monacoCode      = this.editor.getValue(data.code)
      if(collectionCode === monacoCode) return
      const editor = this.editor;
      editor.setValue(data.code)

      //const model = editor.getModel();
      //const position = editor.getPosition();
      
      //editor.executeEdits("update", [
      //  {
      //    range: model.getFullModelRange(),
      //    text: data.code
      //  }
      //]);
      //editor.setPosition(position);
    }  
    if(key == "keyBind"){
      this.setAttribute("mode",data.keyBind)
    }
    if(key == "fontSize"){
      this.editor.updateOptions({ fontSize: data.fontSize})
    }
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))

