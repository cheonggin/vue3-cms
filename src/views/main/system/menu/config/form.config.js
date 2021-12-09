export const formConfig = {
  formItems: [
    {
      field: 'parent',
      label: '父级菜单',
      type: 'cascader',
      placeholder: '请选择父级菜单，不选则默认为一级菜单',
      options: []
    },
    {
      field: 'type',
      label: '菜单类型',
      type: 'radio',
      options: [
        { label: 1, text: '菜单' },
        { label: 2, text: '按钮' }
      ]
    },
    {
      field: 'name',
      label: '菜单名称',
      type: 'input',
      placeholder: '请输入菜单名称'
    },
    {
      field: 'path',
      label: '路由地址',
      type: 'input',
      placeholder: '请输入路由地址'
    },
    {
      field: 'component',
      label: '组件名称',
      type: 'input',
      placeholder: '请输入组件名称'
    },
    {
      field: 'icon',
      label: '图标',
      type: 'input',
      placeholder: '请输入图标'
    },
    {
      field: 'status',
      label: '菜单状态',
      type: 'radio',
      options: [
        { label: true, text: '正常' },
        { label: false, text: '停用' }
      ]
    }
  ]
}
