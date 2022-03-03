import { IMenuList } from '@/components/nav-menu'

export interface UserInfoProps {
  id: number
  name: string
}

export interface IRoleList {
  id: number
  name: string
  desc: string
  create_at: string
  update_at: string
}

export interface LoginStatus {
  token: string
  user: UserInfoProps
  userMenu: IMenuList[]
  entireRole: IRoleList[]
}
