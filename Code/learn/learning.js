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

/* ---------------- Antwort prüfen ---------------- */

function compareAnswer(userAnswer, correctAnswer) {
  const evalBox = document.getElementById("evaluation");

  userAnswer = (userAnswer || "").toLowerCase().trim();
  correctAnswer = (correctAnswer || "").toLowerCase().trim();

  if (userAnswer === correctAnswer) {
    evalBox.textContent = "Richtig! Die Antwort ist: " + correctAnswer;
    evalBox.style.color = "green";
  } else {
    evalBox.textContent = "Falsch! Richtige Antwort: " + correctAnswer;
    evalBox.style.color = "red";
  }
}

/* ---------------- Level / Gewicht setzen ---------------- */

document.querySelectorAll("[data-level]").forEach(btn => {
  btn.onclick = () => {
    const level = Number(btn.dataset.level);

    const name = localStorage.getItem("currentSetName");
    const i = learnsets.findIndex(s => s.name === name);

    if (i !== -1) {
      learnsets[i].index = level; // Gewicht des Sets
      localStorage.setItem("learnsets", JSON.stringify(learnsets));
    }

    const userAnswer = document.getElementById("userAnswer").value;

    compareAnswer(userAnswer, currentCard.antwort);

    document.getElementById("nextBtn").style.display = "block";

    nextCard();
  };
});

/* ---------------- Weighted Set Auswahl ---------------- */

function nextCard() {
  let total = 0;

  for (const set of learnsets) {
    total += set.index || 1; // Schutz gegen 0
  }

  let random = Math.random() * total;

  let selectedSet = null;

  for (const set of learnsets) {
    random -= (set.index || 1);
    if (random < 0) {
      selectedSet = set;
      break;
    }
  }

  if (!selectedSet || !selectedSet.qa || selectedSet.qa.length === 0) return;

  currentCard =
    selectedSet.qa[Math.floor(Math.random() * selectedSet.qa.length)];

  showCard();
}