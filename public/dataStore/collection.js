import {Store} from "/neco-cdn/neco-store/index.js"
import {run} from "@/modules/run.js"
import {cardMap} from "./components.js"

const initial = {
//  card: [],
  idCounter: 0,
  runCounter: 0,
  drawAreaVisible: true,
  code: "",
  fontSize: 18,
  keyBind: "" 
}

export const collection = new Store( structuredClone(initial))

const beforeEmittingFunc = (data, key, value) => {
  if(key=="runCounter"){
    console.log("!!!run")
    const code = data.code
    run(code, cardMap)
  }
}

const initialize = () => {
  console.log("initialize collection")
  collection.onBeforeEmitting = beforeEmittingFunc
}

initialize()