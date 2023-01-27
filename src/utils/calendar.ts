const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];
const Double_Weekdays = WEEKDAYS.concat(WEEKDAYS);

// const zh = {
//   // 完整名称
//   weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
//   // 短名称
//   weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
//   // 缩写
//   weekdaysAbbr: ['日', '一', '二', '三', '四', '五', '六'],
// };

// 英文
const en = {
  // 完整名称
  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  // 短名称
  weekdaysShort: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  // 缩写
  weekdaysAbbr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

/**
 * 获取一星期的名称列表
 *
 * @param {Number[]}  weekdays 一周7天的数字
 *
 * @param {Object[]}
 */
function getWeekHead(weekdays, locale) {
  return weekdays.map((day) => ({
    name: locale.weekdays[day],
    short: locale.weekdaysShort[day],
    abbr: locale.weekdaysAbbr[day],
    day,
  }));
}

function getMonthCalendar(year, month, options) {
  const { weekdays } = options;

  const cursor = new Date(year, month - 1, 1);

  const count = (options.visibleWeeksCount || 6) * 7;
  cursor.setDate(cursor.getDate() - weekdays.indexOf(cursor.getDay()));

  const calendar = [];
  const week: Date[] = [];

  for (let i = 0; i < count; i++) {
    // if (!(i % 7)) {
    //   week = calendar[i / 7];
    // }
    week.push(new Date(cursor));

    cursor.setDate(cursor.getDate() + 1);
  }

  return calendar;
}
// 1表示星期一开头
function getWeeksDays(firstWeekDay = 0) {
  if (firstWeekDay === 0) return WEEKDAYS;
  return Double_Weekdays.slice(firstWeekDay, firstWeekDay + 7);
}
// function format(d) {
//   return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, 0)}-${d
//     .getDate()
//     .toString()
//     .padStart(2, 0)}`;
// }

function printCalendar(year, month, firstWeekday) {
  const weekdays = getWeeksDays(firstWeekday);
  const calendar = getMonthCalendar(year, month, { weekdays });
  const columns = getWeekHead(weekdays, en).map((w) => w.abbr);
  // console.log('www', weekdays, calendar, columns);

  const rows = calendar.map((dates) => {
    const row = {};
    columns.forEach((weekday, index) => {
      const date: Date = dates[index];
      if (isCurrentMonth(date)) {
        row[weekday] = date.getDate();
      }
    });
    return row;
  });
  function isCurrentMonth(d) {
    return d.getFullYear() === year && parseInt(d.getMonth(), 10) + 1 === month;
  }

  // const time = `  ${year}-${month.toString().padStart(2, '0')}`;

  return rows;
}

// 获取每月有几周
export const getWeeks = (year, month) => {
  const d = new Date();
  // 该月的第一天
  d.setFullYear(year, month - 1, 1);
  let w1 = d.getDay();
  if (w1 === 0) w1 = 7;
  // 该月天数
  d.setFullYear(year, month, 0);
  const dd = d.getDate();
  // 第一个周一
  let d1;
  if (w1 !== 1) d1 = 7 - w1 + 2;
  else d1 = 1;
  const week_count = Math.ceil((dd - d1 + 1) / 7);
  return week_count;
};

// 获取所有周一
// 一共几个周一
function getMonthWeek(year, month) {
  // 由于这里我以获取周一为例所以向上取整
  const d = new Date(year, month, 0);
  const t = Math.ceil(d.getDate() / 7);
  return t;
}
function getMondayTime(year, month, weekday) {
  const d = new Date();
  // 该月第一天
  d.setFullYear(year, month - 1, 1);
  let w1 = d.getDay();
  if (w1 === 0) w1 = 7;
  // 该月天数
  d.setFullYear(year, month, 0);
  // 第一个周一
  let d1;
  if (w1 !== 1) d1 = 7 - w1 + 2;
  else d1 = 1;
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const monday = d1 + (weekday - 1) * 7;
  return monday;
}
function gettime(month) {
  const ds = new Date();

  const weeks = getMonthWeek(ds.getFullYear(), month); // 调用方法传入当前年和当前月获得本月几周
  // 获取月第一个周一日期
  const oneDate = getMondayTime(ds.getFullYear(), month, 1);

  const weeksall: string[] = []; // 所有周一
  for (let i = 0; i < weeks; i++) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    weeksall.push(oneDate + i * 7);
  }

  return weeksall;
}
export { gettime };

export default printCalendar;
