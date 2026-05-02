let learnsets = [
  {
    name: "Mathe",
    emoji: "➗",
    description: "Lerne die Grundlagen der Mathematik, von Algebra bis Geometrie.",
    qa: []
  }
];

function addLearnset() {
  const title = document.getElementById("title").value.trim();
  let description = document.getElementById("description").value.trim();

  if (!title) return;

  if (!description) {
    description = "Keine Beschreibung vorhanden.";
  }

  let learnsets = JSON.parse(localStorage.getItem("learnsets") || "[]");

if (
  learnsets.some(
    s => (s.name || "").trim().toLowerCase() === title.trim().toLowerCase()
  )
) {
  alert("Ein Lernset mit diesem Namen existiert bereits.");
  return;
}
  learnsets.push({
    name: title,
    description,
    qa: []
  });


  localStorage.setItem("learnsets", JSON.stringify(learnsets));
  localStorage.setItem("currentSetName", title);

  window.location.href = "Code/cards/editor.html";
}

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
      <h4>${set.name}</h4>
      <p>${count} Karten</p>
    `;

    card.onclick = () => {
      localStorage.setItem("currentSetName", set.name);
      window.location.href = "Code/cards/editor.html";
    };

    container.appendChild(card);
  });
}

window.addEventListener("DOMContentLoaded", renderLearnsets);

window.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("currentSetName");

  if (!name) {
    console.log("Kein Set ausgewählt");
    return;
  }

  loadSet(name);
});