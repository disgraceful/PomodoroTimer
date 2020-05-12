import { calcTime } from "./timer.js";

const logTable = document.querySelector("tbody");
let logs = [];

export const showLogs = () => {
  document.querySelector(".popup").classList.toggle("hidden");
};

export const clearLogs = () => {
  logTable.innerHTML = "";
};

export const createLogEntry = (elapsedTime, status, workCycle, timeMap) => {
  const logName =
    status === "work" ? `${status}_${workCycle + 1}` : `${status}`;
  const logTime = elapsedTime ? elapsedTime : timeMap.get(status);
  const { hours, minutes, seconds } = calcTime(logTime);
  const editedTime =
    logTime >= 3600
      ? `${hours} : ${minutes} : ${seconds}`
      : `${minutes} : ${seconds}`;
  const logDate = new Date().toLocaleDateString();
  const logEntry = { logName, editedTime, logDate };
  logs.push(logEntry);
  addLogEntry(logEntry);
};

const addLogEntry = (logEntry) => {
  const tr = logTable.insertRow();
  for (const logData in logEntry) {
    const td = document.createElement("td");
    const value = document.createTextNode(logEntry[logData]);
    td.appendChild(value);
    tr.appendChild(td);
  }
};
