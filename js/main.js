import { calcTime, updateTime } from "./timer.js";
import { initNotification, createNotification } from "./notification.js";
import { showLogs, clearLogs, createLogEntry } from "./logs.js";
import {
  initSettings,
  showSettings,
  setDefaultSettings,
  saveSettings,
  loadSettings,
} from "./settings.js";

const statusString = document.querySelector("#status");
const selectButtons = document.querySelectorAll(".btn-select");
const [workBtn, breakBtn, longBreakBtn] = selectButtons;

const regularButtons = document.querySelectorAll("button:not(.btn-select)");
const [startBtn, resetBtn, saveBtn, defaultBtn, clearLogBtn] = regularButtons;

const showLog = document.querySelector("#showLog");
const closeLog = document.querySelector(".close-btn");
const settingsToggle = document.querySelector("#settingsToggle");

let { workTime, breakTime, longBreakTime, autoResume } = initSettings();

let status = "work";
let timerActive = false;
let activeTime = workTime;
let workCycle = 0;

const timeMap = new Map();
const refreshTimeMap = () => {
  timeMap.set("work", workTime);
  timeMap.set("break", breakTime);
  timeMap.set("long break", longBreakTime);
};
refreshTimeMap();

initNotification();

const changeStatusStylingByBtn = (sessionStatus, event) => {
  if (status === sessionStatus) {
    return;
  }
  const activeBtn = document.querySelector(".selected");
  activeBtn.classList.toggle("selected");
  event.target.classList.toggle("selected");
  setStatus(sessionStatus);
  resetTimer();
};

const changeStatusStyling = (newStatus) => {
  const activeBtn = document.querySelector(".selected");
  activeBtn.classList.toggle("selected");
  switch (newStatus) {
    case "work":
      workBtn.classList.toggle("selected");
      break;
    case "break":
      breakBtn.classList.toggle("selected");
      break;
    case "long break":
      longBreakBtn.classList.toggle("selected");
      break;
  }
  setStatus(newStatus);
};

const setStatus = (sessionStatus) => {
  status = sessionStatus;
  statusString.textContent = statusToString();
};

const statusToString = () => {
  return `${status === "work" ? `Session #${workCycle + 1}` : "Resting..."}`;
};

updateTime(calcTime(activeTime));
statusString.textContent = statusToString();
setInterval(() => {
  if (timerActive) {
    activeTime--;
    if (activeTime < 0) {
      if (!autoResume) {
        resetTimer();
      } else {
        finishCycle();
      }
    }
    updateTime(calcTime(activeTime));
  }
}, 1000);

const finishCycle = () => {
  if (status === "work") {
    createLogEntry(
      timeMap.get(status) - (activeTime + 1),
      status,
      workCycle,
      timeMap
    );
    workCycle++;
    createNotification(status, workCycle);
    if (workCycle >= 4) {
      workCycle = 0;
      changeStatusStyling("long break");
      activeTime = longBreakTime;
    } else {
      changeStatusStyling("break");
      activeTime = breakTime;
    }
  } else {
    createNotification(status, workCycle);
    createLogEntry(
      timeMap.get(status) - (activeTime + 1),
      status,
      workCycle,
      timeMap
    );
    changeStatusStyling("work");
    activeTime = workTime;
  }
};

const resetTimer = () => {
  if (activeTime < timeMap.get(status)) {
    createLogEntry(
      timeMap.get(status) - (activeTime + 1),
      status,
      workCycle,
      timeMap
    );
  }
  activeTime = timeMap.get(status);
  startBtn.textContent = "Start";
  if (timerActive) {
    startBtn.classList.toggle("active");
    startBtn.classList.toggle("paused");
    timerActive = false;
  }
  workCycle = 0;
  setStatus(status);
  updateTime(calcTime(activeTime));
};

const applySettings = () => {
  saveSettings();
  const values = loadSettings();
  if (values) {
    ({ workTime, breakTime, longBreakTime, autoResume } = values);
    refreshTimeMap();
    resetTimer();
  }
};

startBtn.addEventListener("click", () => {
  timerActive = !timerActive;
  startBtn.textContent = timerActive ? "Pause" : "Start";
  startBtn.classList.toggle("active");
  startBtn.classList.toggle("paused");
});

workBtn.addEventListener("click", changeStatusStylingByBtn.bind(this, "work"));
breakBtn.addEventListener(
  "click",
  changeStatusStylingByBtn.bind(this, "break")
);
longBreakBtn.addEventListener(
  "click",
  changeStatusStylingByBtn.bind(this, "long break")
);

resetBtn.addEventListener("click", resetTimer);
defaultBtn.addEventListener("click", () => {
  setDefaultSettings();
  applySettings();
});
saveBtn.addEventListener("click", applySettings);
clearLogBtn.addEventListener("click", clearLogs);
const toggleLogs = (e) => {
  e.preventDefault();
  showLogs();
};
showLog.addEventListener("click", (e) => toggleLogs(e));
closeLog.addEventListener("click", (e) => toggleLogs(e));
settingsToggle.addEventListener("click", (e) => {
  e.preventDefault();
  showSettings();
});
