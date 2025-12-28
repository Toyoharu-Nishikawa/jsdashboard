const targetSample = {
  autoRun: true, 
  popup1Visible: false,
}

export const initialize = () => {
  settings.setData(targetSample)
}
const eventSet = new Set()
const runEvent = (obj, prop, value) =>{
  const funcList = [...eventSet.values()]
  funcList.forEach(func=>{
    func(obj, prop, value)
  })
}

const handler = {
  get(obj, prop){
    return Reflect.get(obj, prop)
  },
  set(obj, prop, value){
    if(obj[prop]===value)return true
    Reflect.set(obj, prop,value)
    runEvent(obj, prop, value)
    return true
  }
}
 
export const settings = {
  data: {},
  setData(obj){
    this.data = new Proxy(obj, handler)
  },
  addCallback(func){
    eventSet.add(func)
  },
}
 
initialize()
  
