export function stringToHex(str: string) {
  let hex = ''
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i).toString(16)
    hex += code
  }
  return hex
}
