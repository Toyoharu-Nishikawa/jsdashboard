import {TAG_NAME as TG_minijscad, CustomElem as CE_minijscad} from "/neco-cdn/neco-minijscad/index.js"
import {TAG_NAME as TG_three, CustomElem as CE_three} from "/neco-cdn/neco-three/index.js"
import {TAG_NAME as TG_plotly, CustomElem as CE_plotly} from "/neco-cdn/neco-plotly/index.js"
import {TAG_NAME as TG_jspreadsheet, CustomElem as CE_jspreadsheet} from "/neco-cdn/neco-jspreadsheet/index.js"

export const customElemMap = new Map([
  [TG_minijscad, CE_minijscad],
  [TG_three    , CE_three],
  [TG_plotly   , CE_plotly],
  [TG_jspreadsheet   , CE_jspreadsheet],
])
export const cardMap = new Map()

const initialize = () => {
  customElemMap.forEach((value,key)=>{
    if(customElements.get(key)==undefined){
      customElements.define(key, value)
    }
  })
}

initialize()