export interface ITableColumn {
  // 字段名称
  prop: string
  // 表每一列的标题名称
  label: string
  // 对齐方式
  align?: 'left' | 'center' | 'right'
  width?: string | number
  // 对应列的最小宽度
  'min-width'?: string | number
}

export interface ITableConfig {
  isShowIndex?: boolean
  isShowFooter?: boolean
  tableColumn: ITableColumn[]
}
