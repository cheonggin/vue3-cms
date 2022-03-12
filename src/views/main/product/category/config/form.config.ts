import { IFormConfig } from '@/base-ui/form'

export const formConfig: IFormConfig = {
  formData: [
    {
      field: 'pid',
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
    },
    {
      field: 'path',
      label: '路径',
      type: 'input',
      placeholder: '请输入路径'
    },
    {
      field: 'img_url',
      label: '图片链接',
      type: 'input',
      placeholder: '请输入图片链接'
    }
  ],
  span: 24,
  labelPosition: 'left'
}
