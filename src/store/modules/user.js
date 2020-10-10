import { login as ajaxLogin, getInfo, logout } from '@/api/index'
import { asyncRouter } from '../../router/index'

function filterAsyncRouter (router, roles) {
  console.log(router)
  var filterRouter = router.filter(item => {
    console.log(item)
    if (item.meta) {
      if (item.meta.permission) {
        if (item.children) {
          item.children = filterAsyncRouter(item.children, roles)
          return true
        }
        return roles.some(sitem => item.meta.permission.includes(sitem))
      }
      return true
    } else {
      if (item.children) {
        item.children = filterAsyncRouter(item.children, roles)
        return true
      }
      return true
    }
  })
  // console.log(filterRouter, '$$$$$$$$$')
  return filterRouter
}

const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    roles: [],
    info: {},
    addRouters: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROUTERS: (state, router) => {
      state.addRouters = router
      console.log(state.addRouters, router, '999999999999')
    },

    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        ajaxLogin(userInfo).then(res => {
          const result = res.data.result
          // token 设置在代码中
          commit('SET_TOKEN', result.token)
          commit('SET_NAME', { name: result.name })
          commit('SET_AVATAR', result.avatar)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const result = res.data.result
          const permissionslist = result.role.permissions.map(item => item.permissionId)
          result.role.permissionslist = permissionslist
          commit('SET_ROLES', result.role)
          commit('SET_INFO', result)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const accessedRouters = filterAsyncRouter(asyncRouter, roles)
        console.log(accessedRouters, '000000000000000000')
        commit('SET_ROUTERS', accessedRouters)
        resolve(data)
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          // storage.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user
