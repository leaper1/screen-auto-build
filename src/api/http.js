import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
Vue.component(Message.name, Message)
// import * as util from '../utils/util'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://192.168.0.123:9525/demo/api'

if (process.env.NODE_ENV === 'production') {
  const baseURL = window.location.origin
  const pathname = window.location.pathname
  const name = pathname.split('/index.html')[0]
  axios.defaults.baseURL = baseURL + name + '/api'
}

// 错误处理
axios.interceptors.response.use(
  response => {
    return response
  }, error => {
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
    } else if (axios.isCancel(error)) {
      // Vue.prototype.$message({
      //   message: '取消请求',
      //   type: 'error'
      // })
    } else {
      Vue.prototype.$message({
        message: '服务端异常，请联系技术支持',
        type: 'error'
      })
    }
    return Promise.reject(error)
  })

export default axios
