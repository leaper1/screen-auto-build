// sessionStorage
export const session = function (key, value) {
  if (value === void (0)) {
    var lsVal = sessionStorage.getItem(key)
    if (lsVal && lsVal.indexOf('autostringify-') === 0) {
      return JSON.parse(lsVal.split('autostringify-')[1])
    } else {
      return lsVal
    }
  } else {
    if (typeof (value) === 'object' || Array.isArray(value)) {
      value = 'autostringify-' + JSON.stringify(value)
    };
    return sessionStorage.setItem(key, value)
  }
}

// 设置背景图片
var styleKey = {
  backgroundImage: 'url(%s)'
}
export function createStyles (config) {
  let data = config.data
  let styles = {}
  if (data.style) {
    for (let key in data.style) {
      let val = data.style[key]
      if (val === null) continue
      if (key in styleKey) {
        val = styleKey[key].replace('%s', val)
      }
      styles[key] = val
    }
  }
  return styles
}

// 产生随机数函数
const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G']
export function RndString (n) {
  var res = ''
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 17)
    res += chars[id]
  }
  return res
}
export function RndNum (n) {
  var rnd = ''
  for (var i = 0; i < n; i++) { rnd += Math.floor(Math.random() * 10) }
  return rnd
}
