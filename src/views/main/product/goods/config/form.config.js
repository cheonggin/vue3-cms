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
      label: '商品名称',
      type: 'input',
      placeholder: '请输入商品名称'
    },
    {
      field: 'link',
      label: '商品链接',
      type: 'input',
      placeholder: '请输入商品链接'
    },
    {
      field: 'price',
      label: '价格',
      type: 'input',
      placeholder: '请输入价格'
    }
  ]
}
