export const formConfig = {
  formItems: [
    {
      field: 'name',
      label: '管理员名称',
      type: 'input',
      placeholder: '请输入管理员名称'
    },
    {
      field: 'password',
      label: '密码',
      type: 'password',
      placeholder: '请输入密码',
      isHidden: false
    },
    {
      field: 'roleId',
      label: '选择角色',
      type: 'select',
      placeholder: '请选择角色',
      options: []
    }
  ]
}
