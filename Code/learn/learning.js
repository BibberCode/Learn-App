let currentIndex = 0;
let queue = [];

function showCard() {
  const card = queue[currentIndex];

  document.getElementById("question").textContent = card.frage;
  document.getElementById("answer").textContent = card.antwort;

  document.getElementById("answer").style.display = "none";
  document.getElementById("confidenceBox").style.display = "none";
  document.getElementById("nextBtn").style.display = "none";
}

document.getElementById("flipBtn").onclick = () => {
  document.getElementById("answer").style.display = "block";
  document.getElementById("confidenceBox").style.display = "block";
};

document.querySelectorAll("[data-level]").forEach(btn => {
  btn.onclick = () => {
    const level = Number(btn.dataset.level);

    // simple confidence logic (später erweiterbar)
    if (level === 1) queue.push(queue[currentIndex]); // schwer → wiederholen
    if (level === 2) queue.splice(currentIndex + 2, 0, queue[currentIndex]);
    if (level === 3) queue.push(queue[currentIndex]);

    nextCard();
  };
});

function nextCard() {
  currentIndex++;

  if (currentIndex >= queue.length) {
    currentIndex = 0;
  }

  showCard();
}