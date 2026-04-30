// Lernzeit

const today = new Date().toISOString().split("T")[0];

// gespeicherte Werte holen
let savedDate = localStorage.getItem("date");
let startTime = localStorage.getItem("startTime");

// prüfen: neuer Tag oder noch nichts gespeichert
if (!startTime || savedDate !== today) {
    startTime = Date.now();
    localStorage.setItem("startTime", startTime);
    localStorage.setItem("date", today);
} else {
    startTime = Number(startTime);
}

function update() {
    const diff = Date.now() - startTime;

    const minutes = diff / 1000 / 60;

    const maxMinutes = 60;
    const percent = Math.min((minutes / maxMinutes) * 100, 100);

    document.getElementById("bar").style.width = percent + "%";
    document.getElementById("timer").textContent = minutes.toFixed(0) + " min";
    document.getElementById("maxMinutes").textContent = maxMinutes + " min";

    requestAnimationFrame(update);
}

update();