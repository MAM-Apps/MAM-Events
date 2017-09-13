module.exports = (timeMethod) => {

    let timeOffset = (new Date()).getTimezoneOffset() * 60000;
    let now = new Date(Date.now()-timeOffset);
    const endTime = 'T23:59:59.999Z';

  if (timeMethod === 'today'){
      const today = new Date(now).toISOString().split('T')[0].concat(endTime);
      return today;
  }

   else if (timeMethod === 'tomorrow') {

  } else if (timeMethod === 'this-week') {

  } else {

  }
};
