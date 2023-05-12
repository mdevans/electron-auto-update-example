document.addEventListener("DOMContentLoaded", function () {
  const version = document.getElementById("version");
  electron.send("app_version");
  electron.on("app_version", (arg) => {
    version.innerText = "Version " + arg.version;
  });
});

const notification = document.getElementById('notification');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');

electron.on('update_available', () => {
  electron.removeAllListeners('update_available');
  message.innerText = 'A new update is available. Downloading now...';
  notification.classList.remove('hidden');
});

electron.on('update_downloaded', () => {
  electron.removeAllListeners('update_downloaded');
  message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
  restartButton.classList.remove('hidden');
  notification.classList.remove('hidden');
});

function closeNotification() {
  notification.classList.add('hidden');
}
function restartApp() {
  electron.send('restart_app');
}
