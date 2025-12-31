export const run = async (code, cardMap) => {
  //url.searchParams.delete("sample")
  //history.replaceState('','',url.href);
  //window.localStorage.setItem("jsnoteRemember",code)
  console.log("!!!!!!run!!!!!!!")
  window.cardMap = cardMap
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
  const res = await new AsyncFunction(code)()
  return res
}