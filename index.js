// Your code here
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }

  function createEmployeeRecords(arrOfArr) {
    return arrOfArr.map((arr) => createEmployeeRecord(arr));
  }

  function createTimeInEvent(empRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    empRecord.timeInEvents.push({ type: "TimeIn", date: date, hour: parseInt(hour) });
    return empRecord;
  }

  function createTimeOutEvent(empRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    empRecord.timeOutEvents.push({ type: "TimeOut", date: date, hour: parseInt(hour) });
    return empRecord;
  }

  function hoursWorkedOnDate(empRecord, date) {
    const timeIn = empRecord.timeInEvents.find((event) => event.date === date);
    const timeOut = empRecord.timeOutEvents.find((event) => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }

  function wagesEarnedOnDate(empRecord, date) {
    const hours = hoursWorkedOnDate(empRecord, date);
    return hours * empRecord.payPerHour;
  }

  function allWagesFor(empRecord) {
    const datesWorked = empRecord.timeInEvents.map((event) => event.date);
    const wages = datesWorked.reduce((totalWages, date) => {
      return totalWages + wagesEarnedOnDate(empRecord, date);
    }, 0);
    return wages;
  }

  function calculatePayroll(empRecords) {
    const wages = empRecords.reduce((totalWages, empRecord) => {
      return totalWages + allWagesFor(empRecord);
    }, 0);
    return wages;
  }
