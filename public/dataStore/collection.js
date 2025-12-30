import {Store} from "/neco-cdn/neco-store/index.js"
import {run} from "@/modules/run.js"
import {cardMap} from "./components.js"

const initial = {
  card: [],
  idCounter: 0,
  drawAreaVisible: true,
  code: "",
}

export const collection = new Store( structuredClone(initial))

const beforeEmittingFunc = (data, key, value) => {
  if(key=="code"){
    run(value, cardMap)
  }
}

const initialize = () => {
  console.log("initialize collection")
  collection.onBeforeEmitting = beforeEmittingFunc
}

initialize()