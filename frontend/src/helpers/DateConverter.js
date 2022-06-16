// Date string format: 2022-06-14T09:28:00.000Z
// Local timezone target: America/Cambridge_Bay (UTC−07:00)

export function convertUTC2local(dateString, locale = 'en-US', tzString = 'America/Los_Angeles') {
  const date = new Date(dateString)

  const milliseconds = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  )

  const dateLocalized = new Date(milliseconds).toLocaleString(locale, {
    timeZone: tzString,
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZoneName: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true

  })

  return dateLocalized
}

export function convertlocal2UTC(dateString) {
  const [fullDate, time] = dateString.split('T')
  const [year, month, date] = fullDate.split('-')
  const [hour, minute, second] = time.split(':')
  const localDate = new Date(year, month, date, hour, minute, second)

  return localDate.toISOString()
}
