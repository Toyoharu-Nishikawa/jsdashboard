//import {CustomElem as NecoMonaco} from "../../../lib/dist/index.js"
//import sheet from "../../../lib/dist/index.css" with { type: "css" }
//const tsWorker     = "../../../lib/dist/ts.worker-CMbG-7ft.js"
//const editorWorker = "../../../lib/dist/editor.worker-Be8ye1pW.js"

import {CustomElem as NecoMonaco} from "/neco-cdn/neco-monaco/monaco-editor-wc.js"
import sheet from "/neco-cdn/neco-monaco/index.css" with { type: "css" }
const tsWorker     = "/neco-cdn/neco-monaco/ts.worker-CMbG-7ft.js"
const editorWorker = "/neco-cdn/neco-monaco/editor.worker-Be8ye1pW.js"



//import sheet2 from "../../../lib/dist/editor.main.css" with { type: "css" }
//import "@/lib/src/node_modules/monaco-editor/min/vs/editor/editor.main.js"
//import sheet from "@/lib/src/node_modules/monaco-editor/min/vs/editor/editor.main.css" with { type: "css" }
//import monacoCss from "@/lib/src/node_modules/monaco-editor/esm/vs/editor/editor.main.css" with { type: "css" };
//import monacoCss from "@/lib/src/node_modules/monaco-editor/min/vs/editor/editor.main.css" with { type: "css" };

//const tsWorker     = "../../../lib/src/node_modules/monaco-editor/min/vs/assets/ts.worker-CMbG-7ft.js"
//const editorWorker = "../../../lib/src/node_modules/monaco-editor/min/vs/assets/editor.worker-Be8ye1pW.js"


self.MonacoEnvironment = {
  getWorker(_, label) {
    console.log("label",label)
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
//    this.setEvent()
    console.log(this.editor)
//    const monaco = this.monaco
//    const model = this.editor.getModel();
//    console.log(monaco)
//    monaco.editor.setModelLanguage(model,'javascript'); // JavaScriptとして設定
//    monaco.editor.setTheme("vs-dark");
    this.editor.updateOptions({
      fontSize: 18 
    });

  }
  setEvent(){
    reaction.subscribe(this.draw.bind(this)) 
    reaction.subscribe(this.clear.bind(this)) 
  }
  draw(data,key,target){
    if(key !=="mode")return
    this.shadowRoot.setAttribute("mode", value)
  }
  clear(data,key,target){
    if(key !=="clear")return
    this.objMap.forEach(v=>this.scene.remove(v))
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))

