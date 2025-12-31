export const isJSON = (str)=> {
  try {
    JSON.parse(str);
    return true; // パース成功
  }
  catch (e) {
    return false; // パース失敗
  }
}

export const addToLoacalStorage = (storageName, key, value) => {
  const item = window.localStorage.getItem(storageName) 
  const data = isJSON(item) && item != null ? JSON.parse(item): {}
  data[key] = value 
  const itemNew = JSON.stringify(data)
  window.localStorage.setItem(storageName, itemNew)
}
