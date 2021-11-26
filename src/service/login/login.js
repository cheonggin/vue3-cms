import http from '../index'

export function accountLoginRequest(account) {
  return http.post({
    url: '/login',
    data: account
  })
}
