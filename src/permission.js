import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
const loginRoutePath = '/user/login'
// const defaultRoutePath = '/index/workplace'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.state.user.token) {
    console.log(router, store.state.user.addRouters)
    if (!store.state.user.addRouters.length) {
      // request login userInfo
      store.dispatch('GenerateRoutes', { roles: store.state.user.roles }).then((res) => {
        // 根据roles权限生成可访问的路由表
        // 动态添加可访问路由表
        router.addRoutes(store.state.user.addRouters)

        // 请求带有 redirect 重定向时，登录自动重定向到该地址
        // const redirect = decodeURIComponent(from.query.redirect || to.path)
        // if (to.path === redirect) {
        //   // set the replace: true so the navigation will not leave a history record
        //   next({ ...to, replace: true })
        // } else {
        //   // 跳转到目的路由
        //   next({ path: redirect })
        // }
        next({...to})
      }).catch(() => {
        console.log('111')
      })
    } else {
      next()
    }
    NProgress.done()
  } else {
    if (to.path === loginRoutePath) return next()
    next({path: loginRoutePath})
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
