import { Goods, Setting, Plus } from '@element-plus/icons'

const icons = [Goods, Setting, Plus]

export default function (app) {
  for (const icon of icons) {
    app.component(icon.name, icon)
  }
}
