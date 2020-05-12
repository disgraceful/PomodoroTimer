/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./assets/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/logs.js":
/*!********************!*\
  !*** ./js/logs.js ***!
  \********************/
/*! exports provided: showLogs, clearLogs, createLogEntry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showLogs", function() { return showLogs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearLogs", function() { return clearLogs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLogEntry", function() { return createLogEntry; });
/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer.js */ "./js/timer.js");


const logTable = document.querySelector("tbody");
let logs = [];

const showLogs = () => {
  document.querySelector(".popup").classList.toggle("hidden");
};

const clearLogs = () => {
  logTable.innerHTML = "";
};

const createLogEntry = (elapsedTime, status, workCycle, timeMap) => {
  const logName =
    status === "work" ? `${status}_${workCycle + 1}` : `${status}`;
  const logTime = elapsedTime ? elapsedTime : timeMap.get(status);
  const { hours, minutes, seconds } = Object(_timer_js__WEBPACK_IMPORTED_MODULE_0__["calcTime"])(logTime);
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


/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer.js */ "./js/timer.js");
/* harmony import */ var _notification_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notification.js */ "./js/notification.js");
/* harmony import */ var _logs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logs.js */ "./js/logs.js");
/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings.js */ "./js/settings.js");





const statusString = document.querySelector("#status");
const selectButtons = document.querySelectorAll(".btn-select");
const [workBtn, breakBtn, longBreakBtn] = selectButtons;

const regularButtons = document.querySelectorAll("button:not(.btn-select)");
const [
  startBtn,
  finishBtn,
  resetBtn,
  saveBtn,
  defaultBtn,
  clearLogBtn,
] = regularButtons;

const showLog = document.querySelector("#showLog");
const closeLog = document.querySelector(".close-btn");
const settingsToggle = document.querySelector("#settingsToggle");

let { workTime, breakTime, longBreakTime, autoResume } = Object(_settings_js__WEBPACK_IMPORTED_MODULE_3__["initSettings"])();

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

Object(_notification_js__WEBPACK_IMPORTED_MODULE_1__["initNotification"])();

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

Object(_timer_js__WEBPACK_IMPORTED_MODULE_0__["updateTime"])(Object(_timer_js__WEBPACK_IMPORTED_MODULE_0__["calcTime"])(activeTime));
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
    Object(_timer_js__WEBPACK_IMPORTED_MODULE_0__["updateTime"])(Object(_timer_js__WEBPACK_IMPORTED_MODULE_0__["calcTime"])(activeTime));
  }
}, 1000);

const finishCycle = () => {
  if (status === "work") {
    Object(_logs_js__WEBPACK_IMPORTED_MODULE_2__["createLogEntry"])(
      timeMap.get(status) - (activeTime + 1),
      status,
      workCycle,
      timeMap
    );
    workCycle++;
    Object(_notification_js__WEBPACK_IMPORTED_MODULE_1__["createNotification"])(status, workCycle);
    if (workCycle >= 4) {
      workCycle = 0;
      changeStatusStyling("long break");
      activeTime = longBreakTime;
    } else {
      changeStatusStyling("break");
      activeTime = breakTime;
    }
  } else {
    Object(_notification_js__WEBPACK_IMPORTED_MODULE_1__["createNotification"])(status, workCycle);
    Object(_logs_js__WEBPACK_IMPORTED_MODULE_2__["createLogEntry"])(
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
    Object(_logs_js__WEBPACK_IMPORTED_MODULE_2__["createLogEntry"])(
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
  Object(_timer_js__WEBPACK_IMPORTED_MODULE_0__["updateTime"])(Object(_timer_js__WEBPACK_IMPORTED_MODULE_0__["calcTime"])(activeTime));
};

const applySettings = () => {
  Object(_settings_js__WEBPACK_IMPORTED_MODULE_3__["saveSettings"])();
  const values = Object(_settings_js__WEBPACK_IMPORTED_MODULE_3__["loadSettings"])();
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

workBtn.addEventListener("click", changeStatusStylingByBtn.bind(undefined, "work"));
breakBtn.addEventListener(
  "click",
  changeStatusStylingByBtn.bind(undefined, "break")
);
longBreakBtn.addEventListener(
  "click",
  changeStatusStylingByBtn.bind(undefined, "long break")
);

resetBtn.addEventListener("click", resetTimer);
defaultBtn.addEventListener("click", () => {
  Object(_settings_js__WEBPACK_IMPORTED_MODULE_3__["setDefaultSettings"])();
  applySettings();
});
saveBtn.addEventListener("click", applySettings);
finishBtn.addEventListener("click", () => (activeTime = 2));
clearLogBtn.addEventListener("click", _logs_js__WEBPACK_IMPORTED_MODULE_2__["clearLogs"]);
const toggleLogs = (e) => {
  e.preventDefault();
  Object(_logs_js__WEBPACK_IMPORTED_MODULE_2__["showLogs"])();
};
showLog.addEventListener("click", (e) => toggleLogs(e));
closeLog.addEventListener("click", (e) => toggleLogs(e));
settingsToggle.addEventListener("click", (e) => {
  e.preventDefault();
  Object(_settings_js__WEBPACK_IMPORTED_MODULE_3__["showSettings"])();
});


/***/ }),

/***/ "./js/notification.js":
/*!****************************!*\
  !*** ./js/notification.js ***!
  \****************************/
/*! exports provided: initNotification, createNotification */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initNotification", function() { return initNotification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNotification", function() { return createNotification; });
let notificatonStatus = Notification.permission === "granted";
const initNotification = () => {
  if (!window.Notification) {
    console.log("Browser does not support notifications.");
  } else {
    if (!notificatonStatus) {
      Notification.requestPermission()
        .then((permission) => {
          notificatonStatus = permission === "granted";
        })
        .catch((err) => {
          notificatonStatus = false;
          console.error(err);
        });
    }
  }
};

const createNotification = (status, workCycle) => {
  if (notificatonStatus) {
    const body =
      status === "work"
        ? `Pomodoro session ${workCycle} is finished`
        : "Break is over";
    return new Notification("Pomodoro Timer", {
      body,
      icon: "../assets/alarm.png",
    });
  }
};


/***/ }),

/***/ "./js/settings.js":
/*!************************!*\
  !*** ./js/settings.js ***!
  \************************/
/*! exports provided: initSettings, showSettings, setDefaultSettings, saveSettings, loadSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initSettings", function() { return initSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showSettings", function() { return showSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDefaultSettings", function() { return setDefaultSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveSettings", function() { return saveSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadSettings", function() { return loadSettings; });
const inputs = document.querySelectorAll("input");
const [
  pomodoroTimeInput,
  breakTimeInput,
  longBreakTimeInput,
  autoResumeBox,
] = inputs;
const settingsDiv = document.querySelector("#settings");

const defaultWorkTime = 25 * 60;
const defaultBreakTime = 5 * 60;
const defaultLongBreakTime = 10 * 60;

const initSettings = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));
  pomodoroTimeInput.value = settings ? settings.work : defaultWorkTime / 60;
  breakTimeInput.value = settings ? settings.break : defaultBreakTime / 60;
  longBreakTimeInput.value = settings
    ? settings.long
    : defaultLongBreakTime / 60;
  autoResumeBox.checked = settings ? settings.resume : true;
  return {
    workTime: pomodoroTimeInput.value * 60,
    breakTime: breakTimeInput.value * 60,
    longBreakTime: longBreakTimeInput.value * 60,
    autoResume: autoResumeBox.checked,
  };
};

const showSettings = () => {
  settingsDiv.classList.toggle("hidden");
};

const setDefaultSettings = () => {
  pomodoroTimeInput.value = defaultWorkTime / 60;
  breakTimeInput.value = defaultBreakTime / 60;
  longBreakTimeInput.value = defaultLongBreakTime / 60;
  autoResumeBox.value = true;
};

const saveSettings = () => {
  let workV = pomodoroTimeInput.value;
  let breakV = breakTimeInput.value;
  let lbreakV = longBreakTimeInput.value;
  if (workV <= 0 || breakV <= 0 || lbreakV <= 0) {
    alert("Please use numbers higher than 0");
  } else {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        work: workV,
        break: breakV,
        long: lbreakV,
        resume: autoResumeBox.checked,
      })
    );
  }
};

const loadSettings = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));
  return {
    workTime: settings.work * 60,
    breakTime: settings.break * 60,
    longBreakTime: settings.long * 60,
    autoResume: settings.resume,
  };
};


/***/ }),

/***/ "./js/timer.js":
/*!*********************!*\
  !*** ./js/timer.js ***!
  \*********************/
/*! exports provided: calcTime, updateTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calcTime", function() { return calcTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateTime", function() { return updateTime; });
const timerText = document.querySelector("#timer");

const calcTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return {
    hours: formatTime(hours),
    minutes: formatTime(minutes),
    seconds: formatTime(seconds),
  };
};

const updateTime = ({ hours, minutes, seconds }) => {
  timerText.textContent = `${hours}: ${minutes} : ${seconds}`;
};

const formatTime = (time) => {
  if (time < 1) {
    return "00";
  }
  if (time < 10) {
    return `0${time}`;
  }
  return time;
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map