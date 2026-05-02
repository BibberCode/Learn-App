function update() {
    const today = new Date().toISOString().split("T")[0];

    let savedDate = localStorage.getItem("date");
    let startTime = localStorage.getItem("startTime");

    // Tageswechsel
    if (!startTime || savedDate !== today) {
        startTime = Date.now();
        localStorage.setItem("startTime", startTime);
        localStorage.setItem("date", today);

        localStorage.setItem("dailyMinutes", 0); // reset für neuen Tag
    } else {
        startTime = Number(startTime);
    }

    const now = Date.now();
    const diff = now - startTime;
    const minutes = diff / 1000 / 60;

    // gespeicherte Werte holen
    let daily = Number(localStorage.getItem("dailyMinutes") || 0);
    let total = Number(localStorage.getItem("totalMinutes") || 0);

    // nur die DIFFERENZ addieren (wichtig!)
    let lastUpdate = Number(localStorage.getItem("lastUpdate") || now);
    const delta = (now - lastUpdate) / 1000 / 60;

    daily += delta;
    total += delta;

    // speichern
    localStorage.setItem("dailyMinutes", daily);
    localStorage.setItem("totalMinutes", total);
    localStorage.setItem("lastUpdate", now);

    // Anzeige
    const maxMinutes = Number(localStorage.getItem("maxMinutes")) || 60;
    const percent = Math.min((daily / maxMinutes) * 100, 100);

    const bar = document.getElementById("bar");
    const timer = document.getElementById("timer");
    const totalTime = document.getElementById("totalTime");

    if (bar) bar.style.width = percent + "%";
    if (timer) timer.textContent = Math.floor(daily) + " min";
    if (totalTime) totalTime.textContent = Math.floor(total) + " min";

    requestAnimationFrame(update);
}

setInterval(() => {
    if (!document.hidden) {
        update();
    }
}, 1000);