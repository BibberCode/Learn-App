// ===============================
// STATE
// ===============================
let learnsets = JSON.parse(localStorage.getItem("learnsets")) || [];

const currentSetName = (localStorage.getItem("currentSetName") || "").trim();

// ===============================
// INIT (beim Laden der Seite)
// ===============================
window.addEventListener("DOMContentLoaded", () => {
  if (!currentSetName) {
    console.log("Kein Set ausgewählt");
    return;
  }

  loadSet(currentSetName);
});

// ===============================
// SET LADEN
// ===============================
function loadSet(name) {
  learnsets = JSON.parse(localStorage.getItem("learnsets")) || [];

  const set = learnsets.find(s => (s.name || "").trim() === name.trim());
  if (!set) {
    console.log("Set nicht gefunden:", name);
    return;
  }

  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  set.qa = set.qa || [];

  set.qa.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <button onclick="deleteCard(this)" style="background:transparent;border:none;">🗑️</button>

      <h4>Frage</h4>
      <input class="frage" value="${item.frage || ""}">

      <h4 style="margin-top:20px;">Antwort</h4>
      <input class="antwort" value="${item.antwort || ""}">
    `;

    container.appendChild(card);
  });

  document.getElementById("currentSetName").textContent = set.name || "Unbenanntes Set";
  document.getElementById("description").textContent = set.description || "Keine Beschreibung vorhanden.";
  document.getElementById("emoji").textContent = set.emoji || "📘";
}

// ===============================
// KARTE HINZUFÜGEN
// ===============================
function addCard() {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <button onclick="deleteCard(this)" style="background:transparent;border:none;">🗑️ Karte löschen</button>

    <h4>Frage</h4>
    <input class="frage" placeholder="Frage eingeben">

    <h4 style="margin-top:20px;">Antwort</h4>
    <input class="antwort" placeholder="Antwort eingeben">
  `;

  document.getElementById("cardContainer").appendChild(card);
}

// ===============================
// KARTE LÖSCHEN
// ===============================
function deleteCard(btn) {
    const sure = confirm("Bist du sicher?");
    if (!sure) return;

  btn.parentElement.remove();
}

// ===============================
// SPEICHERN
// ===============================
function saveAll() {
  const raw = localStorage.getItem("currentSetName");
  if (!raw) return;

  const name = raw.trim();

  let learnsets = JSON.parse(localStorage.getItem("learnsets")) || [];

  const set = learnsets.find(s => (s.name || "").trim() === name);
  if (!set) return;

  const frageInputs = document.querySelectorAll(".frage");
  const antwortInputs = document.querySelectorAll(".antwort");

  set.qa = [];

  for (let i = 0; i < frageInputs.length; i++) {
    const f = frageInputs[i].value.trim();
    const a = antwortInputs[i].value.trim();

    if (f && a) {
      set.qa.push({
        frage: f,
        antwort: a,
        sicherheit: 0.5
      });
    }
  }

  localStorage.setItem("learnsets", JSON.stringify(learnsets));

  window.location.href = "./cards.html";
}

function saveName() {
    //Name ändern
  const input = document.getElementById("setName");
  const newName = input.value.trim();

  if (!newName) return;

  const oldName = (localStorage.getItem("currentSetName") || "").trim();

  let learnsets = JSON.parse(localStorage.getItem("learnsets")) || [];

  const set = learnsets.find(s => (s.name || "").trim() === oldName);

  if (!set) {
    console.log("Set nicht gefunden:", oldName);
    return;
  }

  set.name = newName;

  localStorage.setItem("learnsets", JSON.stringify(learnsets));
  localStorage.setItem("currentSetName", newName);

  document.getElementById("currentSetName").textContent = newName;
}

function saveDescription() {
  const input = document.getElementById("setDescription");
  const newDescription = input.value.trim();

  const currentName = (localStorage.getItem("currentSetName") || "").trim();

  let learnsets = JSON.parse(localStorage.getItem("learnsets")) || [];

  const set = learnsets.find(s => (s.name || "").trim() === currentName);

  if (!set) {
    console.log("Set nicht gefunden:", currentName);
    return;
  }

  // ✏️ Beschreibung ändern
  set.description = newDescription || "Keine Beschreibung vorhanden.";

  // 💾 speichern
  localStorage.setItem("learnsets", JSON.stringify(learnsets));

  // 🖥 UI aktualisieren (falls div)
  document.getElementById("description").textContent = set.description;
}


function deleteSet() {
  const name = (localStorage.getItem("currentSetName") || "").trim();

  if (!name) {
    console.log("Kein currentSetName");
    return;
  }

  const sure = confirm("Bist du sicher?");
  if (!sure) return;

  let learnsets = JSON.parse(localStorage.getItem("learnsets") || "[]");

  console.log("Vorher:", learnsets);

  const newList = learnsets.filter(
    s => (s.name || "").trim() !== name
  );

  console.log("Nachher:", newList);

  localStorage.setItem("learnsets", JSON.stringify(newList));
  localStorage.removeItem("currentSetName");

  window.location.href = "./cards.html";
}


// ===============================
// EMOJI PICKER
// ===============================

const emojis = ["😀","😂","🔥","📘","➗","⚡","💡","🎯","🚀","❤️","🧪","📊","🎭","🎨","🎵","🧬","🕗","🍏"];

let picker;
let emojiBtn;

// Picker initialisieren NACH DOM Load
window.addEventListener("DOMContentLoaded", () => {
  picker = document.getElementById("emojiPicker");
  emojiBtn = document.getElementById("emoji");

  if (!picker || !emojiBtn) return;

  buildEmojiPicker();

  // Emoji fürs aktuelle Set laden
  loadEmojiForCurrentSet();
});


// PICKER BAUEN
function buildEmojiPicker() {
  emojis.forEach(e => {
    const btn = document.createElement("button");
    btn.textContent = e;

    btn.onclick = () => {
      selectEmoji(e);
    };

    picker.appendChild(btn);
  });
}


// TOGGLE
function toggleEmojiPicker() {
  if (!picker) return;
  picker.classList.toggle("hidden");
}


// EMOJI AUSWÄHLEN (IM SET SPEICHERN)
function selectEmoji(emoji) {
  if (!emojiBtn) return;

  const currentName = (localStorage.getItem("currentSetName") || "").trim();
  if (!currentName) return;

  let learnsets = JSON.parse(localStorage.getItem("learnsets")) || [];

  const set = learnsets.find(s => (s.name || "").trim() === currentName);

  if (!set) return;

  // 👉 im Set speichern
  set.emoji = emoji;

  localStorage.setItem("learnsets", JSON.stringify(learnsets));

  // UI updaten
  emojiBtn.textContent = emoji;

  picker.classList.add("hidden");
}


// EMOJI LADEN
function loadEmojiForCurrentSet() {
  const currentName = (localStorage.getItem("currentSetName") || "").trim();
  if (!currentName || !emojiBtn) return;

  const learnsets = JSON.parse(localStorage.getItem("learnsets")) || [];
  const set = learnsets.find(s => (s.name || "").trim() === currentName);

  if (set?.emoji) {
    emojiBtn.textContent = set.emoji;
  } else {
    emojiBtn.textContent = "📘";
  }
}