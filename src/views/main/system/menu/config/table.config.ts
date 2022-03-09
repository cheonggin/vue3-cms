import { ITableConfig } from '@/base-ui/table'

export const tableConfig: ITableConfig = {
  isShowIndex: false,
  isShowFooter: false,
  tableColumn: [
    { prop: 'name', label: '菜单名称', width: 200 },
    { prop: 'type', label: '菜单类型', 'min-width': 100 },
    { prop: 'path', label: '路由地址', 'min-width': 100 },
    { prop: 'icon', label: '图标', 'min-width': 100 },
    { prop: 'component', label: '组件名称', 'min-width': 100 },
    { prop: 'menu_code', label: '权限标识', 'min-width': 100 },
    { prop: 'create_at', label: '创建时间', 'min-width': 100 },
    { prop: 'update_at', label: '更新时间', 'min-width': 100 },
    { prop: 'operate', label: '操作', 'min-width': 100 }
  ]
}
