import { IMenuList } from '@/components/nav-menu'

export interface UserInfoProps {
  id: number
  name: string
}

export interface LoginStatus {
  token: string
  user: UserInfoProps
  userMenu: IMenuList[]
}
