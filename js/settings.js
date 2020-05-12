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

export const initSettings = () => {
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

export const showSettings = () => {
  settingsDiv.classList.toggle("hidden");
};

export const setDefaultSettings = () => {
  pomodoroTimeInput.value = defaultWorkTime / 60;
  breakTimeInput.value = defaultBreakTime / 60;
  longBreakTimeInput.value = defaultLongBreakTime / 60;
  autoResumeBox.value = true;
};

export const saveSettings = () => {
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

export const loadSettings = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));
  return {
    workTime: settings.work * 60,
    breakTime: settings.break * 60,
    longBreakTime: settings.long * 60,
    autoResume: settings.resume,
  };
};
