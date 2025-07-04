import { DateTime } from 'luxon'

const combineDateTime = (
  date: Date | undefined,
  time: string | undefined //format: 1224
): string => {
  if (!date || !time) return 'date or time undefined'

  const dateStr = DateTime.fromJSDate(date).toISODate() // YYYY-MM-DD format
  const timeStr = time.slice(0, 2) + ':' + time.slice(2, 4) + ':' + '00' // HH:mm:ss format
  // Combine date and time
  const result = DateTime.fromFormat(
    `${dateStr} ${timeStr}`,
    'yyyy-MM-dd HH:mm:ss'
  )
  //@ts-expect-error err crashes the app
  return result.toUTC().toISO()
}
export default combineDateTime
