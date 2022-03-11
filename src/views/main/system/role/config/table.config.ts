import { ITableConfig } from '@/base-ui/table'

export const tableConfig: ITableConfig = {
  tableColumn: [
    { prop: 'name', label: '角色名称', width: 200 },
    { prop: 'desc', label: '描述', 'min-width': 100 },
    { prop: 'create_at', label: '创建时间', 'min-width': 100 },
    { prop: 'update_at', label: '更新时间', 'min-width': 100 },
    { prop: 'operate', label: '操作', 'min-width': 100 }
  ]
}
