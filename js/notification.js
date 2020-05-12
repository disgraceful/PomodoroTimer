let notificatonStatus = Notification.permission === "granted";
export const initNotification = () => {
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

export const createNotification = (status, workCycle) => {
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
