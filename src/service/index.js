import http from './http'

// 管理员登录
export function accountLoginRequest(account) {
  return http.post({
    url: '/rest/admin/login',
    data: account
  })
}

// 获取列表数据
export function getPageListData(url, query) {
  return http.get({
    url: url,
    params: query
  })
}
