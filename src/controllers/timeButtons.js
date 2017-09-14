
/* eslint-disable */
const getDaysInMonth = (date) => {
  let daysInMonth = 0;
  const [yyyy, mm, dd] = date.split('-');
  switch (mm) {
    case '01':
    case '03':
    case '05':
    case '07':
    case '08':
    case '10':
    case '12':
      daysInMonth = 31;
      break;
    case '04':
    case '06':
    case '09':
    case '11':
      daysInMonth = 30;
      break;
    case '02':
      if ((yyyy % 4 === 0) && (yyyy % 100 === 0) && (yyyy % 400 === 0)) {
        daysInMonth = 29;
      } else {
        daysInMonth = 28;
      }
      break;
    default:
      daysInMonth = 0;
      break;
  }
  const dateObj = {
    yyyy: Number(yyyy),
    mm: Number(mm),
    dd: Number(dd),
    daysInMonth
  };
  return dateObj;
};

const getNewDate = (date, daysToAdd, cb) => {
  let {
    yyyy,
    mm,
    dd,
    daysInMonth
  } = cb(date);
  dd += daysToAdd;

  if (dd > daysInMonth) {
    mm += 1;
    dd -= daysInMonth;
  } if (mm > 12) {
    mm = 1;
    yyyy += 1;
  };

  if ( dd.toString().length === 1 ) {
    dd = `0${dd}`;
  } if ( mm.toString().length === 1 ) {
    mm = `0${mm}`;
  }

  const newDate = `${yyyy}-${mm}-${dd}`;
  console.log(newDate);
  return newDate;
};


module.exports = (timeMethod, date) => {
    const timeOffset = (new Date()).getTimezoneOffset() * 60000;

  const [nowDate, nowTime] = new Date(Date.now()-timeOffset).toISOString().split('T');
  console.log(nowDate);
  const endTime = 'T23:59:59.999Z';
  if (timeMethod === 'today') {
    const today = nowDate.concat(endTime);
    return today;
  } else if (timeMethod === 'tomorrow') {
    const tomorrow = getNewDate(nowDate, 1, getDaysInMonth);
    return tomorrow.concat(endTime);
  } else if (timeMethod === 'this-week') {
    const thisWeek = getNewDate(nowDate, 7, getDaysInMonth);
    return thisWeek.concat(endTime);
  } else {
    const newDate = `${date}${endTime}`;
    console.log(`NEW DATE: ${newDate}`);
    return newDate;
  }
};
