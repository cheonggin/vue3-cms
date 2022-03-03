import {
  HomeFilled,
  Fold,
  Expand,
  Goods,
  Setting,
  ArrowDown,
  Search,
  Plus,
  Edit,
  Delete
} from '@element-plus/icons-vue'

import type { App } from 'vue'

const icons = [
  HomeFilled,
  Fold,
  Expand,
  Goods,
  Setting,
  ArrowDown,
  Search,
  Plus,
  Edit,
  Delete
]

export default function (app: App) {
  for (const icon of icons) {
    app.component(icon.name, icon)
  }
}
