// Lernsets bearbeiten
function renderLearnsetsEdit() {
  const container = document.getElementById("learnsetListEdit");
  container.innerHTML = "";

  const learnsets = JSON.parse(localStorage.getItem("learnsets")) || [];

  // ✅ HIER prüfen
  if (learnsets.length === 0) {
    const card = document.createElement("div");

    card.innerHTML = "<div>Keine Lernsets gefunden.</div>";

    container.appendChild(card);
    return;
  }

  // ✅ erst danach durchgehen
  learnsets.forEach(set => {
    const card = document.createElement("div");
    card.className = "small-card";

    const count = set.qa ? set.qa.length : 0;

    card.innerHTML = `
      <h4>${set.emoji} ${set.name}</h4>
      <p>${count} Karten</p>
      <p class="small-text" style="margin-top:8px;">${set.description || ""}</p>
    `;

    card.onclick = () => {
      localStorage.setItem("currentSetName", set.name);
      window.location.href = "./Code/cards/editor.html";
    };

    container.appendChild(card);
  });
}

window.addEventListener("DOMContentLoaded", renderLearnsetsEdit);




// Lernsets üben
function renderLearnsetsLearn() {
  const container = document.getElementById("learnsetListLearn");
  container.innerHTML = "";

  const learnsets = JSON.parse(localStorage.getItem("learnsets")) || [];

  // ✅ HIER prüfen
  if (learnsets.length === 0) {
    const card = document.createElement("div");

    card.innerHTML = "<div>Keine Lernsets gefunden.</div>";

    container.appendChild(card);
    return;
  }

  // ✅ erst danach durchgehen
  learnsets.forEach(set => {
    const card = document.createElement("div");
    card.className = "small-card";

    const count = set.qa ? set.qa.length : 0;

    card.innerHTML = `
      <h4>${set.emoji} ${set.name}</h4>
      <p>${count} Karten</p>
      <p class="small-text" style="margin-top:8px;">${set.description || ""}</p>
    `;

    card.onclick = () => {
      if (set.mode === "self-compare") {
        localStorage.setItem("currentSetName", set.name);
        window.location.href = "./Code/learn/self-compare/learning_self-compare.html";
        return;
      }

      if (set.mode === "input-answer") {
        localStorage.setItem("currentSetName", set.name);
        window.location.href = "./Code/learn/input-answer/learning_input-answer.html";
        return;
      }
    };

    container.appendChild(card);
  });
}

window.addEventListener("DOMContentLoaded", renderLearnsetsLearn);