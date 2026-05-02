let running = false;
let lastUpdate = Date.now();

function update() {
    if (!running) return;

    const now = Date.now();
    const delta = (now - lastUpdate) / 1000 / 60;
    lastUpdate = now;

    // gespeicherte Werte
    let daily = Number(localStorage.getItem("dailyMinutes") || 0);
    let total = Number(localStorage.getItem("totalMinutes") || 0);

    daily += delta;
    total += delta;

    localStorage.setItem("dailyMinutes", daily);
    localStorage.setItem("totalMinutes", total);

    // Anzeige
    const maxMinutes = Number(localStorage.getItem("maxMinutes")) || 60;
    const percent = Math.min((daily / maxMinutes) * 100, 100);

    const bar = document.getElementById("bar");
    const timer = document.getElementById("timer");
    const totalTime = document.getElementById("totalTime");

    if (bar) bar.style.width = percent + "%";
    if (timer) timer.textContent = Math.floor(daily) + " min";
    if (totalTime) totalTime.textContent = Math.floor(total) + " min";
}

// startet nur wenn aktiv
function start() {
    if (running) return;
    running = true;
    lastUpdate = Date.now();
    loop();
}

// stoppt sofort
function stop() {
    running = false;
}

// Loop nur wenn aktiv
function loop() {
    if (!running) return;
    update();
    requestAnimationFrame(loop);
}

// Tab sichtbar / unsichtbar
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        stop();
    } else {
        start();
    }
});

// zusätzlich Fokus/Blur (wichtig für Mobile/Windows)
window.addEventListener("blur", stop);
window.addEventListener("focus", start);

// Start beim Laden
start();