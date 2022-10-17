const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];
const Double_Weekdays = WEEKDAYS.concat(WEEKDAYS);


const zh = {
  // 完整名称 
  weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  // 短名称
  weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  // 缩写
  weekdaysAbbr: ['日', '一', '二', '三', '四', '五', '六']
}

// 英文
const en = {
  // 完整名称 
  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  // 短名称
  weekdaysShort: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  // 缩写
  weekdaysAbbr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}

/**
 * 获取一星期的名称列表
 *
 * @param {Number[]}  weekdays 一周7天的数字
 *
 * @param {Object[]}
 */
function getWeekHead(weekdays, locale) {
  return weekdays.map(day => ({
    name: locale.weekdays[day],
    short: locale.weekdaysShort[day],
    abbr: locale.weekdaysAbbr[day],
    day: day
  }))
}

// 
function getMonthCalendar(year, month, options) {
  const weekdays = options.weekdays;

  const cursor = new Date(year, month - 1, 1)
  const count = (options.visibleWeeksCount || 6) * 7
  cursor.setDate(cursor.getDate() - weekdays.indexOf(cursor.getDay()))

  const calendar = []
  let week = []

  for (let i = 0; i < count; i++) {
    if (!(i % 7)) {
      week = calendar[i / 7] = []
    }
    week.push(
      new Date(cursor)
    )

    cursor.setDate(cursor.getDate() + 1)
  }

  return calendar


}
function getWeeksDays(firstWeekDay = 0) {
  if (firstWeekDay === 0) return WEEKDAYS;
  return Double_Weekdays.slice(firstWeekDay, firstWeekDay + 7);

}
function format(d) {
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, 0)}-${d.getDate().toString().padStart(2, 0)}`
}

function printCalendar(year, month, firstWeekday) {
  const weekdays = getWeeksDays(firstWeekday)
  const calendar = getMonthCalendar(year, month, { weekdays })
  const columns = getWeekHead(weekdays, en).map((w) => w.abbr)

  const rows = calendar.map((dates) => {
    const row = {}
    columns.forEach((weekday, index) => {
      const date = dates[index]
      if (isCurrentMonth(date)) {
        row[weekday] = date.getDate()
      }
    })
    return row
  })
  function isCurrentMonth(d) {
    return d.getFullYear() === year && d.getMonth() + 1 === month
  }

  const time = `  ${year}-${month.toString().padStart(2, '0')}`
  
  return rows
}
export default printCalendar