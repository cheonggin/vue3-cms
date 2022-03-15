import { IFormConfig } from '@/base-ui/form'

export const formConfig: IFormConfig = {
  formData: [
    {
      field: 'name',
      label: '商品名称',
      type: 'input',
      placeholder: '请输入商品名称'
    },
    {
      field: 'desc',
      label: '商品描述',
      type: 'input',
      placeholder: '请输入商品描述'
    },
    {
      field: 'image',
      label: '商品图片',
      type: 'input',
      placeholder: '请输入商品图片'
    },
    {
      field: 'price',
      label: '商品价格',
      type: 'input',
      placeholder: '请输入商品价格'
    }
  ],
  span: 24,
  labelPosition: 'left'
}
