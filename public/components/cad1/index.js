import {CustomElem as NecoMinijscad} from "neco-components/minijscad/index.js"
import *as Person from "@/dataStore/person.js"

export const TAG_NAME = import.meta.url.split("/")?.slice(3,-1)?.join("-") ?? "origin"

export const CustomElem = class extends NecoMinijscad {
  constructor(){
    super()
  }
  connectedCallback(){
    super.connectedCallback()
    console.log("connected callback of", TAG_NAME)
    this.initialize()
  }
  initialize(){
    Person.person.addCallback(this.draw.bind(this))
    this.draw()
  }
  draw(){
    const property = Person.person.data
    const height = property.height
    const weight = property.weight

    const screen    = super.sketch.screen
    screen.removeAllSheets()

    const sheet0    = screen.addSheet("sheet0")
    const polyline = [
      [0,0],
      [weight,0],
      [weight,height],
      [0,height],
      [0,0],
    ]
    sheet0.addFig("polyline", {points: polyline})
  } 
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
