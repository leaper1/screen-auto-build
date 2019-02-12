import Vue from 'vue'
import App from './App.vue'
import 'normalize.css'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'

import router from './router'
import store from './store'

import 'font-awesome/css/font-awesome.min.css'
import './styles/index.scss'

import changeTheme from './utils/changeTheme'

import instance from './api/http'

NProgress.configure({ showSpinner: false })

Vue.use(ElementUI, { size: 'small' })
Vue.use(vuescroll, {
  ops: {
    bar: {
      background: '#DDDEE0'
    }
  }
})

// 加载用户主题
if (localStorage.getItem('themeValue')) {
  changeTheme(localStorage.getItem('themeValue'))
} else {
  changeTheme('409EFF')
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  instance,
  render: h => h(App)
}).$mount('#app')
