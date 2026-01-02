import {Store} from "/neco-cdn/neco-store/index.js"
import {run} from "@/modules/run.js"
import {cardMap} from "./components.js"
import {saveStringAsFile} from "@/modules/save.js"

const initial = {
//  card: [],
  idCounter: 0,
  drawAreaVisible: true,
  code: "",
  layout: null,
  fontSize: 18,
  keyBind: "" ,
  readCounter  : 0,
  saveCounter  : 0,
  importCounter: 0,
  exportCounter: 0,
  fileName: "",
}

export const collection = new Store( structuredClone(initial))

const beforeEmittingFunc = (data, key, value) => {
  if(key=="runCounter"){
    const code = data.code
    run(code, cardMap)
  }
}

const afterEmittingFunc = (data, key, value) => {
  if(key=="readCounter"){
    console.log("!!!read")
    const text = data.fileText
  }
  if(key==="saveCounter"){
    const layout = data.layout
    const code = data.code
    //const idCounter = data.idCounter
    const exportData = {code, layout}
    const exportText = JSON.stringify(exportData, null, "  ")
    saveStringAsFile(exportText, "input.txt")
  }
}
const initialize = () => {
  console.log("initialize collection")
  collection.onBeforeEmitting = beforeEmittingFunc
  collection.onAfterEmitting  = afterEmittingFunc
}

initialize()