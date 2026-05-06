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
      window.location.href = "./Code/cards/editor.html";
    };

    container.appendChild(card);
  });
}

window.addEventListener("DOMContentLoaded", renderLearnsets);