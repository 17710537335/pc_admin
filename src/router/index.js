import Vue from 'vue'
import Router from 'vue-router'

import layout from '@/views/layout'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 单router-view标签 template
const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

Vue.use(Router)

export const asyncRouter = [
  // 导航一
  {
    path: '/',
    name: 'layout',
    component: layout,
    meta: { title: '首页', keepAlive: true, icon: 'bxAnaalyse' },
    redirect: '/index/workplace',
    children: [
      // 基本内容
      {
        path: '/index',
        name: 'index',
        redirect: '/index/workplace',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: 'bxAnaalyse', permission: [ 'index' ] },
        children: [
          {
            path: '/index/workplace',
            name: 'workplace',
            component: () => import('@/views/workplace'),
            meta: {
              title: '工作台',
              keepAlive: true,
              icon: 'bxAnaalyse',
              permission: [ 'index_workplace' ]
            }
          },
          {
            path: '/index/workplace2',
            name: 'workplace2',
            component: () => import('@/views/workplace'),
            meta: {
              title: '工作台2',
              keepAlive: true,
              icon: 'bxAnaalyse',
              permission: [ 'index_workplace2' ]
            }
          }
        ]
      }
    ]
  },

  {
    path: '*', redirect: '/404'
  }
]

let router = new Router({
  // mode: 'history',
  // routes: constantRouterMap
  routes: [
    {
      path: '/404',
      component: () => import(/* webpackChunkName: "fail" */ '@/views/404')
    },

    // login
    {
      path: '/user',
      name: 'user',
      component: RouteView,
      meats: { title: 'menu.user' },
      redirect: '/user/login',
      children: [
        {
          path: '/user/login',
          name: 'login',
          component: () => import('@/views/user/login'),
          meta: {
            title: 'menu.dashboard',
            keepAlive: true,
            icon: 'bxAnaalyse',
            permission: [ 'dashboard' ]
          }
        }
      ]
    }
  ]
})

export default router
