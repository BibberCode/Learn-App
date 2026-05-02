function updateStreak() {
    const today = new Date().toISOString().split("T")[0];

    let savedDateStreak = localStorage.getItem("dateStreak");
    let streak = Number(localStorage.getItem("streak") || 0);

    if (!savedDateStreak) {
        streak = 1;
    } else {
        if (savedDateStreak !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const y = yesterday.toISOString().split("T")[0];

            streak = (savedDateStreak === y) ? streak + 1 : 1;

            localStorage.setItem("streak", streak);
            localStorage.setItem("dateStreak", today);
        }
    }
    
    document.getElementById("streak").textContent = streak + " Tage";
}

updateStreak();