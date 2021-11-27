import http from '../index'

export function accountLoginRequest(account) {
  return http.post({
    url: '/rest/admin/login',
    data: account
  })
}
