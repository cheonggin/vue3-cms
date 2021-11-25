import Http from './http'
import { BASE_URL, TIME_OUT } from './http/config'

export default new Http({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})
