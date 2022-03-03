import { IFormConfig } from '@/base-ui/form'

export const formConfig: IFormConfig = {
  formData: [
    { field: 'name', label: '管理员名称', type: 'input' },
    { field: 'role_id', label: '担任角色', type: 'select', options: [] },
    { field: 'password', label: '密码', type: 'password', isHidden: false }
  ],
  span: 24,
  labelPosition: 'left'
}
