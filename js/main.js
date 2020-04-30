const timerPara = document.querySelector("#timer");
const statusString = document.querySelector("#status");
const settingsDiv = document.querySelector("#settings");
const inputs = document.querySelectorAll("input");
const [pomodoroTimeInput, breakTimeInput, longBreakTimeInput] = inputs;
const buttons = document.querySelectorAll("button");
const [startBtn, finishBtn, resetBtn, saveBtn, defaultBtn] = buttons;


const defaultWorkTime = 25 * 60;
const defaultBreakTime = 5 * 60;
const defaultLongBreakTime = 10 * 60;

const settings = JSON.parse(localStorage.getItem("settings"));
pomodoroTimeInput.value = settings ? settings.work : defaultWorkTime / 60;
breakTimeInput.value = settings ? settings.break : defaultBreakTime / 60;
longBreakTimeInput.value = settings ? settings.long : defaultLongBreakTime / 60;
let workTime = pomodoroTimeInput.value * 60;
let breakTime = breakTimeInput.value * 60;
let longBreakTime = longBreakTimeInput.value * 60;


let status = "work";
let notificatonStatus = Notification.permission === "granted";

const timeMap = new Map();
timeMap.set("work", workTime);
timeMap.set("break", breakTime);
timeMap.set("long break", breakTime);

let timerActive = false;
let activeTime = workTime;
let workCycle = 0;

if (!window.Notification) {
    console.log('Browser does not support notifications.');
} else {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                notificatonStatus = true;
            }
        }).catch(err => {
            console.error(err);
        });
    }
}

const calcTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    console.log(`${formatTime(minutes)} : ${formatTime(seconds)}`);
    timerPara.textContent = `${formatTime(minutes)} : ${formatTime(seconds)}`;
}

const formatTime = (time) => {
    if (time < 1) {
        return "00";
    }
    if (time < 10) {
        return `0${time}`;
    }
    return time;
}


calcTime(activeTime);
statusString.textContent = status;
const myInterval = setInterval(() => {
    if (timerActive) {
        activeTime--;
        if (activeTime < 0) {
            finishCycle();
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
            status = "long break";
            statusString.textContent = status;
            activeTime = longBreakTime;
        } else {
            status = "break";
            statusString.textContent = status;
            activeTime = breakTime;
        }
    } else {
        createNotification();
        status = "work"
        statusString.textContent = status;
        activeTime = workTime;
    }
}
const createNotification = () => {
    if (notificatonStatus) {
        const body = status === "work" ? `Pomodoro session ${workCycle} is finished` : "Break is over";
        return new Notification("Pomodoro Timer", { body, icon: "../assets/alarm_large.png" });
    }
}

const resetTimer = () => {
    activeTime = timeMap.get(status);
    startBtn.textContent = "Start";
    if (timerActive) {
        startBtn.classList.toggle("active");
        startBtn.classList.toggle("paused");
        timerActive = false;
    }
    calcTime(activeTime);
}

const showSettings = () => {
    settingsDiv.classList.toggle("hidden");
}

const setDefaultSettings = () => {
    pomodoroTimeInput.value = defaultWorkTime / 60;
    breakTimeInput.value = defaultBreakTime / 60;
    longBreakTimeInput.value = defaultLongBreakTime / 60;
    saveSettings();
}

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
        localStorage.setItem("settings", JSON.stringify({
            work: workV,
            break: breakV,
            long: lbreakV
        }));
        timeMap.set("work", workTime);
        timeMap.set("break", breakTime);
        timeMap.set("long break", breakTime);
        resetTimer();
    }
}

startBtn.addEventListener("click", () => {
    timerActive = !timerActive;
    startBtn.textContent = timerActive ? "Pause" : "Start";
    startBtn.classList.toggle("active");
    startBtn.classList.toggle("paused");
});

resetBtn.addEventListener("click", resetTimer);
defaultBtn.addEventListener("click", setDefaultSettings);
saveBtn.addEventListener("click", saveSettings);
finishBtn.addEventListener("click", () => activeTime = 2);