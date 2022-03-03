import { ITableConfig } from '@/base-ui/table'

export const tableConfig: ITableConfig = {
  tableColumn: [
    { prop: 'name', label: '管理员名称', align: 'center', 'min-width': 120 },
    { prop: 'create_at', label: '创建时间', align: 'center', 'min-width': 150 },
    { prop: 'update_at', label: '更新时间', align: 'center', 'min-width': 150 },
    { prop: 'operate', label: '操作', align: 'center', 'min-width': 120 }
  ]
}
