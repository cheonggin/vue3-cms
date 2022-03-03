type IFormType = 'input' | 'password' | 'select'
type IFormPosition = 'left' | 'right' | 'top'

export interface IFormItem {
  field: string
  // 标签
  label: string
  // 表单类型，文本框、密码框等
  type: IFormType
  placeholder?: string
  isHidden?: boolean
  // 选择框的可选项
  options?: any[]
}

export interface IFormConfig {
  formData: IFormItem[]
  labelPosition?: IFormPosition
  labelWidth?: string
  // 栅格占据的列数
  span?: number
}
