export interface IMenuList {
  id: number
  pid?: number
  name: string
  type: 1 | 2
  path: string
  icon: string
  component: string
  menu_code: string
  create_at: Date
  update_at: Date
  children?: IMenuList[]
}
