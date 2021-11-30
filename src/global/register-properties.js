import { formatUTC } from '@/utils/formate-time'

export default function registerProperties(app) {
  app.config.globalProperties.$filter = {
    formatTime(val) {
      return formatUTC(val)
    }
  }
}
