import { IFormConfig } from '@/base-ui/form'

export const formConfig: IFormConfig = {
  formData: [
    {
      field: 'name',
      label: '管理员名称',
      type: 'input',
      placeholder: '请输入管理员名称'
    },
    {
      field: 'role_id',
      label: '担任角色',
      type: 'select',
      options: [],
      placeholder: '请选择角色'
    },
    {
      field: 'password',
      label: '密码',
      type: 'password',
      isHidden: false,
      placeholder: '请输入管理员密码'
    }
  ],
  span: 24,
  labelPosition: 'left'
}
