// Your code here
let employeeRecords = [];

const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
  let employeeRecord = {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
  employeeRecords.push(employeeRecord);
  return employeeRecord;
};

const createEmployeeRecords = (employee) => {
  let employeeContainer = [];
  employee.map((e) => {
    employeeContainer.push(createEmployeeRecord(e));
  });
  return employeeContainer;
};

const createTimeInEvent = (employee, time) => {
  let date = time.slice(0, 10);
  let hour = parseInt(time.slice(11));
  let type = "TimeIn";
  let timeIn = {
    type,
    date,
    hour,
  };
  employee.timeInEvents.push(timeIn);
  return employee;
};

const createTimeOutEvent = (employee, time) => {
  let date = time.slice(0, 10);
  let hour = parseInt(time.slice(11));
  let type = "TimeOut";
  let timeOut = {
    type,
    date,
    hour,
  };
  employee.timeOutEvents.push(timeOut);
  return employee;
};

const hoursWorkedOnDate = (employee, day) => {
  for (let i = 0; i < employee.timeInEvents.length; i++) {
    if (day === employee.timeInEvents[i].date) {
      let hoursWorked = Math.abs(
        (employee.timeInEvents[i].hour - employee.timeOutEvents[i].hour) / 100
      );
      return hoursWorked;
    }
  }
};

const wagesEarnedOnDate = (employee, day) => {
  const wageEarned = hoursWorkedOnDate(employee, day) * employee.payPerHour;
  return wageEarned;
};

const allWagesFor = (employee) => {
  let totalWagesEarned = employee.timeInEvents.reduce((totalWage, el) => {
    let wage = wagesEarnedOnDate(employee, el.date);
    let earned = totalWage + wage;
    totalWage + wage;
    return earned;
  }, 0);
  return totalWagesEarned;
};

const calculatePayroll = (employees) => {
  let total = employees.reduce((totalWage, workerWage) => {
    let dayWage = allWagesFor(workerWage, workerWage.timeInEvents[0].date);
    return totalWage + dayWage;
  }, 0);
  return total;
};
