import axios from 'axios'
// import router from '../router'

const request = axios.create({
  baseURL: '/api',
  timeout: 6000
})

// request.interceptors.request.use(function (config) {
//   const token = 1
//   // 如果 token 存在
//   // 让每个请求携带自定义 token 请根据实际情况自行修改
//   if (token) {
//     config.headers['Access-Token'] = token
//     if (config.method === 'get') {
//       config.params = {
//         token
//       }
//     } else {
//       config.data = {
//         token
//       }
//     }
//   } else {
//     router.replace('login')
//     // return config

//     // getToken().then(res => {
//     //   console.log(config, '*********')
//     //   return config
//     // })
//   }
// }, function (error) {
//   // 对请求错误做点什么

//   return Promise.reject(error)
// })

// axios.interceptors.response.use(function (config) {
//   // 对响应数据做点什么

//   return config
// }, function (error) {
//   // 对响应错误做点什么

//   return Promise.reject(error)
// })

// function getToken () {
//   return request({
//     url: '/token',
//     method: 'post'
//   })
// }

export function login (data) {
  return request({
    url: '/login',
    method: 'post',
    data: data || {}
  })
}

export function getInfo (data) {
  return request({
    url: '/user/info',
    method: 'get',
    params: data || {}
  })
}

export function logout (data) {
  return request({
    url: '/user/logout',
    method: 'post',
    params: data || {}
  })
}
