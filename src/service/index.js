import http from './http'
import URL from './constant'

// 管理员登录
export function accountLoginRequest(account) {
  return http.post({
    url: URL.LOGIN_URL,
    data: account
  })
}
