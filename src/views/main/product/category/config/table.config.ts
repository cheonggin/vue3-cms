import { ITableConfig } from '@/base-ui/table'

export const tableConfig: ITableConfig = {
  isShowIndex: false,
  isShowFooter: false,
  tableColumn: [
    { prop: 'name', label: '分类名称', width: 200 },
    { prop: 'create_at', label: '创建时间', 'min-width': 100 },
    { prop: 'update_at', label: '更新时间', 'min-width': 100 },
    { prop: 'operate', label: '操作', 'min-width': 100 }
  ]
}
