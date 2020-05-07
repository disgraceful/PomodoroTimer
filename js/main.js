const timerPara = document.querySelector("#timer");
const statusString = document.querySelector("#status");
const settingsDiv = document.querySelector("#settings");

const inputs = document.querySelectorAll("input");
const [
  pomodoroTimeInput,
  breakTimeInput,
  longBreakTimeInput,
  autoResumeBox,
] = inputs;

const selectButtons = document.querySelectorAll(".btn-select");
const [workBtn, breakBtn, longBreakBtn] = selectButtons;

const regularButtons = document.querySelectorAll("button:not(.btn-select)");
const [startBtn, finishBtn, resetBtn, saveBtn, defaultBtn] = regularButtons;

const defaultWorkTime = 25 * 60;
const defaultBreakTime = 5 * 60;
const defaultLongBreakTime = 10 * 60;

const settings = JSON.parse(localStorage.getItem("settings"));
pomodoroTimeInput.value = settings ? settings.work : defaultWorkTime / 60;
breakTimeInput.value = settings ? settings.break : defaultBreakTime / 60;
longBreakTimeInput.value = settings ? settings.long : defaultLongBreakTime / 60;
autoResumeBox.checked = settings ? settings.resume : true;

let workTime = pomodoroTimeInput.value * 60;
let breakTime = breakTimeInput.value * 60;
let longBreakTime = longBreakTimeInput.value * 60;
let autoResume = autoResumeBox.value;

let status = "work";
let notificatonStatus = Notification.permission === "granted";

const timeMap = new Map();
timeMap.set("work", workTime);
timeMap.set("break", breakTime);
timeMap.set("long break", longBreakTime);

let timerActive = false;
let activeTime = workTime;
let workCycle = 0;

if (!window.Notification) {
  console.log("Browser does not support notifications.");
} else {
  if (Notification.permission !== "granted") {
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          notificatonStatus = true;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

const changeStatusBtnStyling = (sessionStatus, event) => {
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

const calcTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  console.log(
    `${formatTime(hours)} : ${formatTime(minutes)} : ${formatTime(seconds)}`
  );
  timerPara.textContent = `${formatTime(hours)}: ${formatTime(
    minutes
  )} : ${formatTime(seconds)}`;
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

calcTime(activeTime);
statusString.textContent = statusToString();
const myInterval = setInterval(() => {
  if (timerActive) {
    activeTime--;
    if (activeTime < 0) {
      console.log(autoResume);
      if (!autoResume) {
        resetTimer();
      } else {
        finishCycle();
      }
    }
    calcTime(activeTime);
  }
}, 1000);

const finishCycle = () => {
  if (status === "work") {
    workCycle++;
    createNotification();
    if (workCycle >= 4) {
      workCycle = 0;
      changeStatusStyling("long break");
      activeTime = longBreakTime;
    } else {
      changeStatusStyling("break");
      activeTime = breakTime;
    }
  } else {
    createNotification();
    changeStatusStyling("work");
    activeTime = workTime;
  }
};
const createNotification = () => {
  if (notificatonStatus) {
    const body =
      status === "work"
        ? `Pomodoro session ${workCycle} is finished`
        : "Break is over";
    return new Notification("Pomodoro Timer", {
      body,
      icon: "../assets/alarm_large.png",
    });
  }
};

const resetTimer = () => {
  console.log(status);
  activeTime = timeMap.get(status);
  startBtn.textContent = "Start";
  if (timerActive) {
    startBtn.classList.toggle("active");
    startBtn.classList.toggle("paused");
    timerActive = false;
  }
  workCycle = 0;
  calcTime(activeTime);
};

const showSettings = () => {
  settingsDiv.classList.toggle("hidden");
};

const setDefaultSettings = () => {
  pomodoroTimeInput.value = defaultWorkTime / 60;
  breakTimeInput.value = defaultBreakTime / 60;
  longBreakTimeInput.value = defaultLongBreakTime / 60;
  autoResumeBox.value = true;
  saveSettings();
};

const saveSettings = () => {
  let workV = pomodoroTimeInput.value;
  let breakV = breakTimeInput.value;
  let lbreakV = longBreakTimeInput.value;
  if (workV <= 0 || breakV <= 0 || lbreakV <= 0) {
    alert("Please use numbers higher than 0");
  } else {
    workTime = workV * 60;
    breakTime = breakV * 60;
    longBreakTime = lbreakV * 60;
    autoResume = autoResumeBox.checked;
    localStorage.setItem(
      "settings",
      JSON.stringify({
        work: workV,
        break: breakV,
        long: lbreakV,
        resume: autoResumeBox.checked,
      })
    );
    timeMap.set("work", workTime);
    timeMap.set("break", breakTime);
    timeMap.set("long break", longBreakTime);
    resetTimer();
  }
};

startBtn.addEventListener("click", () => {
  timerActive = !timerActive;
  startBtn.textContent = timerActive ? "Pause" : "Start";
  startBtn.classList.toggle("active");
  startBtn.classList.toggle("paused");
});

workBtn.addEventListener("click", changeStatusBtnStyling.bind(this, "work"));
breakBtn.addEventListener("click", changeStatusBtnStyling.bind(this, "break"));
longBreakBtn.addEventListener(
  "click",
  changeStatusBtnStyling.bind(this, "long break")
);

resetBtn.addEventListener("click", resetTimer);
defaultBtn.addEventListener("click", setDefaultSettings);
saveBtn.addEventListener("click", saveSettings);
finishBtn.addEventListener("click", () => (activeTime = 2));
