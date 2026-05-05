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
  evalBox.style.display = "block";

  userAnswer = (userAnswer || "").toLowerCase().trim();
  correctAnswer = (correctAnswer || "").toLowerCase().trim();

  if (userAnswer === correctAnswer) {
    evalBox.textContent = "Richtig! Antwort: " + currentCard.antwort;
    evalBox.style.color = "green";
  } else {
    evalBox.textContent = "Falsch! Richtige Antwort: " + correctAnswer;
    evalBox.style.color = "red";
  }
}

/* ---------------- CONFIDENCE ---------------- */

document.querySelectorAll("[data-level]").forEach(btn => {
  btn.onclick = () => {
    const level = Number(btn.dataset.level);

    const userAnswer = document.getElementById("userAnswer").value;

    compareAnswer(userAnswer, currentCard.antwort);

    // 👉 Level in KARTEN speichern (wichtig!)
    const name = localStorage.getItem("currentSetName");
    const set = learnsets.find(s => s.name === name);

    if (set) {
      const card = set.qa.find(q => q.frage === currentCard.frage);

      if (card) {
        card.sicherheit = level;
      }

      localStorage.setItem("learnsets", JSON.stringify(learnsets));
    }

    document.getElementById("nextBtn").style.display = "block";
  };
});

/* ---------------- NEXT CARD ---------------- */

function nextCard() {
  const name = localStorage.getItem("currentSetName");
  const set = learnsets.find(s => s.name === name);

  if (!set || !set.qa.length) return;

  currentCard = set.qa[Math.floor(Math.random() * set.qa.length)];

  document.getElementById("userAnswer").value = "";

  showCard();
}