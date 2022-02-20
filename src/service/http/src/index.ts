import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import type { AxiosInstance, AxiosError } from 'axios'
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

import { HttpConfig, HttpInterceptors } from './type'

class Http {
  instance: AxiosInstance
  interceptors?: HttpInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: HttpConfig) {
    this.instance = axios.create(config)
    this.interceptors = config?.interceptors
    this.showLoading = config.showLoading ?? true

    // 单独实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestOnFulfilled,
      this.interceptors?.requestOnRejected
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseOnFulfilled,
      this.interceptors?.responseOnRejected
    )

    // 所有实例都有的拦截器
    this.instance.interceptors.request.use(
      config => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '加载中...'
          })
        }
        return config
      },
      (err: AxiosError) => Promise.reject(err)
    )

    this.instance.interceptors.response.use(
      res => {
        this.loading?.close()
        return res.data
      },
      (err: AxiosError) => {
        this.loading?.close()

        if (err.response) {
          if (err.response.data.msg) {
            ElMessage({ message: err.response.data.msg, type: 'error' })
          }
        }

        return Promise.reject(err)
      }
    )
  }

  request<T = any>(config: HttpConfig): Promise<T> {
    if (config.showLoading === false) {
      this.showLoading = config.showLoading
    }

    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestOnFulfilled) {
        config = config.interceptors.requestOnFulfilled(config)
      }

      this.instance
        .request<any, T>(config)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  get<T = any>(config: HttpConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: HttpConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T = any>(config: HttpConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T = any>(config: HttpConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default Http
