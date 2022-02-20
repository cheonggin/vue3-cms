import http from './http'
import type { ILoginAccount } from './type'

export function loginAccount(data: ILoginAccount) {
  return http.request({
    url: '/login/admin',
    data,
    method: 'post'
  })
}
