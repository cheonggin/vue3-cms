import { ITableConfig } from '@/base-ui/table'

export const tableConfig: ITableConfig = {
  tableColumn: [
    { prop: 'name', label: '商品名称', width: 200, align: 'center' },
    { prop: 'image', label: '商品图片', width: 200, align: 'center' },
    { prop: 'price', label: '商品价格', width: 200, align: 'center' },
    { prop: 'create_at', label: '创建时间', 'min-width': 100, align: 'center' },
    { prop: 'update_at', label: '更新时间', 'min-width': 100, align: 'center' },
    { prop: 'operate', label: '操作', 'min-width': 100, align: 'center' }
  ]
}
