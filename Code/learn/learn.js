/* =========================
   INIT / SAFE LOAD
========================= */

function getLearnsets() {
  try {
    return JSON.parse(localStorage.getItem("learnsets")) || [];
  } catch {
    return [];
  }
}

function saveLearnsets(data) {
  localStorage.setItem("learnsets", JSON.stringify(data));
}


/* =========================
   RENDER LEARNSETS
========================= */

function renderLearnsets() {
  const container = document.getElementById("learnsetList");
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
      window.location.href = "./learning.html";
    };

    container.appendChild(card);
  });
}


/* =========================
   LOAD SET (SAFE HOOK)
========================= */

function loadSet(name) {
  const learnsets = getLearnsets();
  const set = learnsets.find(s => s.name === name);

  if (!set) return;

  console.log("Loaded set:", set);
}


/* =========================
   INIT
========================= */

window.addEventListener("DOMContentLoaded", () => {
  renderLearnsets();
});