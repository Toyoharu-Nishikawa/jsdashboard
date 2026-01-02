export const run = async (code, cardMap) => {
  window.cardMap = cardMap
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
  const res = await new AsyncFunction(code)()
  return res
}