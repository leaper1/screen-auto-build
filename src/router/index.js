import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

import Main from '../views/Main.vue'
import Root from '../views/Root.vue'
import Login from '../views/login'

Vue.use(Router)

/**
 * meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

let routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/',
    name: '_home',
    component: Main,
    redirect: '/home',
    meta: {
      title: '首页',
      icon: 'fa fa-home'
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          hideInBread: true,
          title: '首页',
          icon: 'fa fa-home'
        },
        component: () => import('../views/home')
      },
      {
        path: '/templet',
        name: 'Templet',
        meta: {
          title: '模板管理',
          icon: 'fa fa-object-group',
          isLeaf: true
        },
        component: () => import('../views/templet'),
        children: [{
          path: 'edit',
          name: 'AddTemplet',
          meta: {
            hideInMenu: true,
            title: '新建模板',
            icon: 'fa fa-object-group'
          },
          component: () => import('../views/templet/edit')
        }]
      },
      {
        path: '/program',
        name: 'Program',
        meta: {
          title: '节目管理',
          icon: 'fa fa-newspaper-o'
        },
        component: () => import('../views/program')
      },
      {
        path: '/material',
        name: 'Material',
        meta: {
          title: '素材管理',
          icon: 'fa fa-share-alt-square',
          notLink: true
        },
        component: Root,
        children: [{
          path: 'list',
          name: 'materialList',
          meta: {
            title: '素材列表',
            icon: 'fa fa-list-ul'
          },
          component: () => import('../views/material')
        }, {
          path: 'uplist',
          name: 'uploadList',
          meta: {
            title: '上传列表',
            icon: 'fa fa-list-ul'
          },
          component: () => import('../views/material/uplist')
        }]
      },
      {
        path: '/user',
        name: 'User',
        meta: {
          hideInMenu: true,
          title: '个人中心',
          icon: 'fa fa-user'
        },
        component: () => import('../views/user')
      },
      {
        path: '/setting',
        name: 'Setting',
        meta: {
          hideInMenu: true,
          title: '系统设置',
          icon: 'fa fa-cog'
        },
        component: () => import('../views/setting')
      }
    ]
  },
  {
    path: '/404',
    component: resolve => require(['../views/NotFound'], resolve),
    name: '404'
  },
  {
    path: '*',
    redirect: { path: '/404' }
  }
]

let router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  let routeName = to.meta.title || to.name
  window.document.title = (routeName ? routeName + ' - ' : '') + 'ScreenBuild'
  next()
})

router.afterEach(transition => {
  NProgress.done()
})

let menuCount = routes.length
routes[menuCount - 3].children.forEach(route => {
  appendMetaChildren(route)
})

function appendMetaChildren (route) {
  if (route.children) {
    if (!route.meta) route.meta = {}
    route.meta.children = route.children
    route.children.forEach(sub => {
      appendMetaChildren(sub)
    })
  }
}

export default router
