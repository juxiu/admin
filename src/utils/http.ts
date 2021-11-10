import Http from 'axios'
import { ElMessage } from 'element-plus'
// import router from "@/router/index"
function errorHandler(res: any) {
  switch (res.status) {
    case 404:
      // todo 跳转到404
      break
    case 403:
      // todo 没权限
      break
    case 500:
      ElMessage.error('服务器开小差啦！')
      break
    default:
      ElMessage.error('出错啦！')
  }
}

const ajax = <T = any>(url: string, params: any = {}) => {
  const transferParams = { ...params, url }
  return new Promise<T>((resolve, reject) => {
    Http(transferParams)
      .then((res: any) => {
        if (res.status === 200) resolve(res.data)
        else reject(res.data)
      })
      .catch((err: any) => {
        errorHandler(err)
      })
  })
}

export default {
  request(baseURL: string) {
    return function <T = any>(params: any) {
      const { opts = {} } = params
      let apiParams = {}
      // TODO 一些请求头处理

      Http.defaults.withCredentials = true
      console.log(params,'params');
      
      if (params.method === 'get') {
        apiParams = {
          params: opts,
          method: params.method,
        }
      } else if (params.method === 'post') {
        apiParams = {
          headers: { 'content-type': 'application/json' },
          data: JSON.stringify(params.opts),
          method: params.method,
        }
      }
      if (params.opts instanceof FormData) {
        apiParams = {
          headers: { 'content-type': 'multipart/form-data' },
          data: opts,
          method: params.method,
        }
      }
      return ajax<T>(baseURL + params.url, apiParams)
    }
  },
}
