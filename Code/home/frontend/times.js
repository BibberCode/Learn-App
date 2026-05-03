let running = false;
let lastUpdate = 0;
let interval = null;

// --- DAILY RESET ---
function checkNewDay() {
    const today = new Date().toISOString().split("T")[0];
    const savedDate = localStorage.getItem("date");

    if (savedDate !== today) {
        localStorage.setItem("date", today);
        localStorage.setItem("dailyMinutes", "0");
    }
}

// --- UPDATE ---
function update() {
    if (!running) return;

    const now = Date.now();
    const delta = (now - lastUpdate) / 1000 / 60; // Minuten
    lastUpdate = now;

    checkNewDay();

    let daily = Number(localStorage.getItem("dailyMinutes") || 0);
    let total = Number(localStorage.getItem("totalMinutes") || 0);

    daily += delta;
    total += delta;

    // sauber speichern (weniger Drift)
    localStorage.setItem("dailyMinutes", daily.toFixed(4));
    localStorage.setItem("totalMinutes", total.toFixed(4));

    // Anzeige
    const maxMinutes = Number(localStorage.getItem("maxMinutes")) || 60;
    const percent = maxMinutes > 0
        ? Math.min((daily / maxMinutes) * 100, 100)
        : 0;

    const bar = document.getElementById("bar");
    const timer = document.getElementById("timer");
    const totalTime = document.getElementById("totalTime");

    if (bar) bar.style.width = percent + "%";
    if (timer) timer.textContent = Math.floor(daily) + " min";
    if (totalTime) totalTime.textContent = Math.floor(total) + " min";
}

// --- START ---
function start() {
    if (running) return;

    running = true;
    lastUpdate = Date.now();

    interval = setInterval(update, 200); // 5x pro Sekunde reicht
}

// --- STOP ---
function stop() {
    if (!running) return;

    running = false;

    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}

// --- STATUS CHECK (WICHTIG) ---
function shouldRun() {
    return !document.hidden && document.hasFocus();
}

function updateState() {
    if (shouldRun()) {
        start();
    } else {
        stop();
    }
}

// --- EVENTS ---
document.addEventListener("visibilitychange", updateState);
window.addEventListener("focus", updateState);
window.addEventListener("blur", updateState);

// --- INIT ---
checkNewDay();
updateState();