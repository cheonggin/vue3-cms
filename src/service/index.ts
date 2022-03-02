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
