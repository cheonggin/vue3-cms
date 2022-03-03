import http from './http'
import type { IDataType, ILoginAccount, IQueryInfo } from './type'

export function loginAccount(data: ILoginAccount) {
  return http.post<IDataType>({
    url: '/login/admin',
    data
  })
}

export function getPageList(url: string, queryInfo: IQueryInfo) {
  return http.get<IDataType>({ url, params: queryInfo })
}

export function addPageData(url: string, data: any) {
  return http.post<IDataType>({ url, data })
}

export function updatePageData(url: string, data: any) {
  return http.put<IDataType>({ url, data })
}

export function deletePageData(url: string) {
  return http.delete<IDataType>({ url })
}
