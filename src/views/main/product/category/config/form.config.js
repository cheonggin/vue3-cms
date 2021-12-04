export const formConfig = {
  formItems: [
    {
      field: 'parent',
      label: '父级分类',
      type: 'cascader',
      placeholder: '请选择父级分类，不选则默认为一级分类',
      options: []
    },
    {
      field: 'name',
      label: '分类名称',
      type: 'input',
      placeholder: '请输入分类名称'
    }
  ]
}
