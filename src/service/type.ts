export interface IDataType {
  code: number
  data: any
  msg: string
}

export interface ILoginAccount {
  name: string
  password: string
}

export interface IQueryInfo {
  query: string
  offset: number
  limit: number
}
