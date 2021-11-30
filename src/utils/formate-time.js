import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUTC(utcStr, format = DATE_TIME_FORMAT) {
  return dayjs.utc(utcStr).utcOffset(8).format(format)
}
