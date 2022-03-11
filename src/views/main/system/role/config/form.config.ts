import { IFormConfig } from '@/base-ui/form'

export const formConfig: IFormConfig = {
  formData: [
    {
      field: 'name',
      label: '角色名称',
      type: 'input',
      placeholder: '请输入角色名称'
    },
    {
      field: 'desc',
      label: '描述',
      type: 'input',
      placeholder: '请输入角色描述'
    }
  ],
  span: 24,
  labelPosition: 'left'
}
