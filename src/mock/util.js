// 正常请求结构
const responseBody = {
  message: '',
  timestamp: 0,
  result: null,
  code: 0
}

// 处理code message result timestamp值
export const builder = (data, message, code = 0, headers = {}) => {
  responseBody.result = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code
    responseBody._status = code
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  responseBody.timestamp = new Date().getTime()

  return responseBody
}

// get请求解析请求参数
export const getQueryParameters = (options) => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}

// 获取post方法body参数
export const getBody = (options) => {
  // options 传递的参数
  return options.body && JSON.parse(options.body)
}
