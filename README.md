## Pomodoro Timer

The point of Pomodoro technique is to split your work in 25 minute sessions followed by 5 minute break. That way you control your work schedule, increase focus, avoid tiredness buildup and burnout.

This timer implements such technique for you, automatically following work sessions by break until reset or stopped. Desktop notifications are used to notify when session or break is finished. **Allowing Notifications is advised!**

Logs of your working sessions recorded in log table, avaliable at clicking 'Logs' button.

### Settings

You can change length of sessions or breaks by clicking on 'Settings' links and changing input fields values. Your settings will be saved in localStorage. To restore to defaults (25/5/10) click 'Reset'.

Work sessions are followed by breaks automatically, to turn turn this option off, uncheck checkbox in 'Settings'.

### Build

Project hosted on GitHub Pages, but if you want to use it locally:

Clone repository or download and extract the archive.

Install dependencies

```console
npm install
```

Build for development using Webpack (with source map):

```console
npm run build-dev
```

Build for production (optimized and minimized):

```console
npm run build-prod
```

Start Webpack development server:

```console
npm run start
```
