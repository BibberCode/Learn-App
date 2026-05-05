let currentCard = null;
const learnsets = JSON.parse(localStorage.getItem("learnsets")) || [];

nextCard();

/* ---------------- UI ---------------- */

function showCard() {
  if (!currentCard) return;

  document.getElementById("question").textContent = currentCard.frage;

  document.getElementById("evaluation").textContent = "";
  document.getElementById("nextBtn").style.display = "none";
}

function updateFinishedCardsBar() {
  const name = localStorage.getItem("currentSetName");
  const set = learnsets.find(s => (s.name || "").trim() === (name || "").trim());

  if (!set || !set.qa.length) return;

  const total = set.qa.length;
  const low = set.qa.filter(c => (c.sicherheit ?? 1) <= 1).length;

  const percent = (low / total) * 100;

  document.getElementById("finishedCardsBar").style.width = percent + "%";
  document.getElementById("finishedCardsText").textContent =
    `${low} / ${total} sind schon geschafft`;
}

window.addEventListener("DOMContentLoaded", () => {
  updateFinishedCardsBar();
});

/* ---------------- Antwort prüfen ---------------- */

function compareAnswer(userAnswer, correctAnswer) {
  const evalBox = document.getElementById("evaluation");
  evalBox.style.display = "block";

  userAnswer = (userAnswer || "").toLowerCase().trim();
  correctAnswer = (correctAnswer || "").toLowerCase().trim();

  if (userAnswer === correctAnswer) {
    evalBox.textContent = "Richtig! Antwort: " + currentCard.antwort;
    evalBox.style.color = "green";
  } else {
    evalBox.textContent = "Falsch! Richtige Antwort: " + currentCard.antwort;
    evalBox.style.color = "red";
  }
}

/* ---------------- CONFIDENCE ---------------- */

document.querySelectorAll("[data-level]").forEach(btn => {
  btn.onclick = () => {
    const level = Number(btn.dataset.level);

    const userAnswer = document.getElementById("userAnswer").value;

    compareAnswer(userAnswer, currentCard.antwort);

    const name = localStorage.getItem("currentSetName");
    const set = learnsets.find(s => (s.name || "").trim() === (name || "").trim());

    if (set) {
      const card = set.qa.find(q => q.frage === currentCard.frage);

      if (card) {
        card.sicherheit = level;
        localStorage.setItem("learnsets", JSON.stringify(learnsets));
      }
    }

    document.getElementById("nextBtn").style.display = "block";
  };
});

/* ---------------- NEXT CARD ---------------- */

function nextCard() {
  const name = localStorage.getItem("currentSetName");
  const set = learnsets.find(s => (s.name || "").trim() === (name || "").trim());

  if (!set || !set.qa.length) return;

  const finishedCards = set.qa.filter(card => (card.sicherheit ?? 1) <= 1);

  if (finishedCards.length === set.qa.length) {
    document.getElementById("question").textContent = "Alle Karten geschafft 🎉";
    return;
  }

  currentCard = getWeightedCard(set.qa);

  document.getElementById("userAnswer").value = "";

  showCard();
  updateFinishedCardsBar();
}

/* ---------------- WEIGHTED RANDOM ---------------- */

function getWeightedCard(cards) {
  const pool = [];

  for (const card of cards) {
    const s = card.sicherheit ?? 3; // Standard: mittel

    let weight;

    if (s === 1) {
      weight = 1; // sehr sicher → selten
    } 
    else if (s === 2) {
      weight = 2;
    } 
    else if (s === 3) {
      weight = 3;
    } 
    else if (s === 4) {
      weight = 5;
    } 
    else if (s === 5) {
      weight = 8; // sehr unsicher → sehr oft
    } 
    else {
      weight = 3; // fallback
    }

    for (let i = 0; i < weight; i++) {
      pool.push(card);
    }
  }

  if (pool.length === 0) {
    return cards[Math.floor(Math.random() * cards.length)];
  }

  return pool[Math.floor(Math.random() * pool.length)];
}