import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'

const DEAFULT_LOADING = true
export default class Http {
  constructor(config) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ? config.showLoading : DEAFULT_LOADING

    this.instance.interceptors.request.use(
      config => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true
          })
        }
        return config
      },
      error => console.log(error)
    )

    this.instance.interceptors.response.use(
      res => {
        // 将loading移除
        this.loading?.close()

        return res.data
      },
      error => {
        // 将loading移除
        this.loading?.close()

        if (error.response.data.message) {
          ElMessage({
            type: 'error',
            message: err.response.data.message
          })
        }

        return Promise.reject(error)
      }
    )
  }

  request(config) {
    return new Promise((resolve, reject) => {
      // 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request(config)
        .then(res => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          resolve(res)
        })
        .catch(error => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING

          reject(error)
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'GET' })
  }

  post(config) {
    return this.request({ ...config, method: 'POST' })
  }

  patch(config) {
    return this.request({ ...config, method: 'PATCH' })
  }

  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }
}
