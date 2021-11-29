import Http from './src'
import { BASE_URL, TIME_OUT } from './src/config'

export default new Http({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})
