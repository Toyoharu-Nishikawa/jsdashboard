import {Store} from "/neco-cdn/neco-store/index.js"

const initial = {
  card: [],
  idCounter: 0,
  drawAreaVisible: true,
}

export const collection = new Store(initial)

const initialize = () => {

}

initialize()