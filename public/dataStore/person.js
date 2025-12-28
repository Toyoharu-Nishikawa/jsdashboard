import * as Settings from "@/dataStore/settings.js"

const targetSample = {
  height: 170, //[cm]
  weight: 60,  //[kg]
}
const isEmptyObject = (obj) => {
  const is = obj ===null || obj ===undefined || Object.keys(obj).length  === 0
  return is
 }
 
const initialTarget = isEmptyObject(window.__APP_DATA__) ? targetSample: window.__APP_DATA__

export const initialize = () => {
  calc(initialTarget)
  person.setData(initialTarget)
  console.log("initialize person")
}

export const load = (data) => {
  console.log("load person")
  person.setData(data)
  runEvent(person.data)
}

export const run = () => {
  console.log("run person")
  calc(person.data)
  runEvent(person.data)
}
const eventSet = new Set()
const runEvent = (obj, prop, value) =>{
  const funcList = [...eventSet.values()]
  funcList.forEach(func=>{
    func(obj, prop, value)
  })
}

export const calc = (obj) => {
  const BMI =Math.round(obj.weight/(obj.height/100)**2)
  obj.BMI = BMI
}

const handler = {
  get(obj, prop){
    return Reflect.get(obj, prop)
  },
  set(obj, prop, value){
    Reflect.set(obj, prop,value)
    if(Settings.settings.data.autoRun){
      calc(obj) 
    }
    runEvent(obj, prop, value)
    return true
  }
}

export const person = {
  data: {},
  setData(obj){
    this.data = new Proxy(obj, handler)
  },
  addCallback(func){
    eventSet.add(func)
  },
}

initialize()
