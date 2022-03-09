import { IFormConfig } from '@/base-ui/form'

export const formConfig: IFormConfig = {
  formData: [
    {
      field: 'pid',
      label: '父级菜单',
      type: 'cascader',
      placeholder: '请选择父级菜单，不选则默认为一级菜单',
      options: []
    },
    {
      field: 'name',
      label: '菜单名称',
      type: 'input',
      placeholder: '请输入菜单名称'
    },
    {
      field: 'type',
      label: '菜单类型',
      type: 'radio',
      options: [
        { label: '1', text: '菜单' },
        { label: '2', text: '按钮' }
      ]
    },
    {
      field: 'path',
      label: '路由地址',
      type: 'input',
      placeholder: '请输入路由地址'
    },
    {
      field: 'icon',
      label: '图标',
      type: 'input',
      placeholder: '请输入图标'
    },
    {
      field: 'component',
      label: '组件名称',
      type: 'input',
      placeholder: '请输入组件名称'
    },
    {
      field: 'menu_code',
      label: '权限标识',
      type: 'input',
      placeholder: '请输入权限标识'
    }
  ],
  span: 24,
  labelPosition: 'left'
}
