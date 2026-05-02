let learnsets = [
  {
    name: "Mathe",
    discription: "Lerne die Grundlagen der Mathematik, von Algebra bis Geometrie.",
    qa: [
      { frage: "", antwort: "", sicherheit: 0.9 },
      { frage: "", antwort: "", sicherheit: 0.7 }
    ]
  }
];

function addLearnset() {
  const title = document.getElementById('title').value;
  let description = document.getElementById('description').value;

  if (!title) {
    alert("Bitte gib einen Titel ein.");
    return;
  }

  if (!description) {
    description = "Keine Beschreibung vorhanden.";
  }

  // zuerst speichern
  learnsets.push({
    name: title,
    description: description,
  });

  localStorage.setItem("learnsets", JSON.stringify(learnsets));

  // dann wechseln
  window.location.href = "/Code/cards/editor.html";
}