import http from './http'
import URL from './constant'

// 管理员登录
export function accountLoginRequest(account) {
  return http.post({
    url: URL.LOGIN_URL,
    data: account
  })
}

// 用户列表
export function getUserList(query) {
  return http.get({
    url: URL.USER_LIST_URL,
    params: query
  })
}
