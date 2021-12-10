import { Goods, Setting } from '@element-plus/icons'

const icons = [Goods, Setting]

export default function (app) {
  for (const icon of icons) {
    app.component(icon.name, icon)
  }
}
