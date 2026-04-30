console.log("profile.js geladen");

//Name
function saveName() {
  const name = document.getElementById("nameInput").value;

  document.getElementById("name").textContent = name;

  localStorage.setItem("name", name);
}

window.onload = function () {
  const saved = localStorage.getItem("name");

  if (saved) {
    document.getElementById("name").textContent = saved;
    document.getElementById("nameInput").value = saved;
  }
};

//Avatar
const input = document.getElementById("fileInput");
const img = document.getElementById("avatarImg");

// Default Avatar (Fallback)
const DEFAULT_AVATAR = "";

// IndexedDB helper (leicht gehalten mit localStorage + Base64)
function saveAvatar(dataUrl) {
  localStorage.setItem("avatar", dataUrl);
}

function loadAvatar() {
  return localStorage.getItem("avatar");
}

// Beim Start laden
window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("fileInput");
  const img = document.getElementById("avatarImg");

  const saved = localStorage.getItem("avatar");

  if (saved) {
    img.src = saved;
  }

  input.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result;
      localStorage.setItem("avatar", reader.result);
    };

    reader.readAsDataURL(file);
  });
});

// Datei auswählen
input.addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const dataUrl = reader.result;

    img.src = dataUrl;
    saveAvatar(dataUrl);
  };

  reader.readAsDataURL(file);
});