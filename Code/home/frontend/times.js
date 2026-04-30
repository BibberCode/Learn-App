function update() {
    const today = new Date().toISOString().split("T")[0];

    let savedDate = localStorage.getItem("date");
    let startTime = localStorage.getItem("startTime");

    if (!startTime || savedDate !== today) {
        startTime = Date.now();
        localStorage.setItem("startTime", startTime);
        localStorage.setItem("date", today);
    } else {
        startTime = Number(startTime);
    }

    const diff = Date.now() - startTime;
    const minutes = diff / 1000 / 60;

    const maxMinutes = 60;
    const percent = Math.min((minutes / maxMinutes) * 100, 100);

    const bar = document.getElementById("bar");
    const timer = document.getElementById("timer");
    const totalTime = document.getElementById("totalTime");

    if (bar) bar.style.width = percent + "%";
    if (timer) timer.textContent = Math.floor(minutes) + " min";

    let total = Number(localStorage.getItem("totalMinutes") || 0);
    total = minutes;

    localStorage.setItem("totalMinutes", total);

    if (totalTime) totalTime.textContent = Math.floor(total) + " min";

    requestAnimationFrame(update);
}

update();