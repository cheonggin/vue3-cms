import http from './http'

// 管理员登录
export function accountLoginRequest(account) {
  return http.post({
    url: '/login',
    data: account
  })
}

// 获取列表数据
export function getPageListData(url, query) {
  return http.get({
    url,
    params: query
  })
}

// 通过id删除数据
export function deletePageData(url) {
  return http.delete({ url })
}

// 添加数据
export function createPageData(url, data) {
  return http.post({ url, data })
}

// 修改数据
export function editPageData(url, data) {
  return http.patch({ url, data })
}
