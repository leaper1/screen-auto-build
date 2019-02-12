import Vue from 'vue'
import { Message } from 'element-ui'
Vue.component(Message.name, Message)

// 深拷贝
export const deepcopy = function (source) {
  if (!source) {
    return source
  }
  let sourceCopy = source instanceof Array ? [] : {}
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item]
  }
  return sourceCopy
}

// 菜单数据组织
export const buildMenu = function (array, ckey) {
  let menuData = []
  let indexKeys = Array.isArray(array) ? array.map((e) => { return e.id }) : []
  ckey = ckey || 'parentId'
  array.forEach(function (e, i) {
    // 一级菜单
    if (!e[ckey] || (e[ckey] === e.id)) {
      delete e[ckey]
      menuData.push(deepcopy(e)) // 深拷贝
    } else if (Array.isArray(indexKeys)) {
      // 检测ckey有效性
      let parentIndex = indexKeys.findIndex(function (id) {
        return id === e[ckey]
      })
      if (parentIndex === -1) {
        menuData.push(e)
      }
    }
  })
  let findChildren = function (parentArr) {
    if (Array.isArray(parentArr) && parentArr.length) {
      parentArr.forEach(function (parentNode) {
        array.forEach(function (node) {
          if (parentNode.id === node[ckey]) {
            if (parentNode.children) {
              parentNode.children.push(node)
            } else {
              parentNode.children = [node]
            }
          }
        })
        if (parentNode.children) {
          findChildren(parentNode.children)
        }
      })
    }
  }
  findChildren(menuData)
  return menuData
}

// ajax错误处理
export const catchError = error => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        Vue.prototype.$message({
          message: '请求参数异常',
          type: 'error'
        })
        break
      case 401:
        sessionStorage.removeItem('user')
        Vue.prototype.$message({
          message: '身份验证过期，请重新登录！',
          type: 'warning',
          duration: 2000,
          onClose: function () {
            location.reload()
          }
        })
        break
      case 403:
        Vue.prototype.$message({
          message: error.response.data.message || '无访问权限，请联系企业管理员',
          type: 'warning'
        })
        break
      default:
        Vue.prototype.$message({
          message: '服务端异常，请联系技术支持',
          type: 'error'
        })
    }
  } else {
    Vue.prototype.$message({
      message: '服务端异常，请联系技术支持',
      type: 'error'
    })
  }
  return Promise.reject(error)
}
