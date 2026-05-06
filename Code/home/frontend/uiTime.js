function renderTimerUI() {
  const bar = document.getElementById("bar");
  const timer = document.getElementById("timer");
  const totalTime = document.getElementById("totalTime");

  if (!bar) return; // verhindert Fehler wenn DOM noch nicht ready

  const daily = Number(localStorage.getItem("dailyMinutes") || 0);
  const total = Number(localStorage.getItem("totalMinutes") || 0);
  const max = Number(localStorage.getItem("maxMinutes")) || 60;

  const percent = max > 0
    ? Math.min((daily / max) * 100, 100)
    : 0;

  bar.style.width = percent + "%";

  if (timer) timer.textContent = Math.floor(daily) + " min";
  if (totalTime) totalTime.textContent = Math.floor(total) + " min";
}

/* AUTO UI LOOP */
setInterval(renderTimerUI, 200);