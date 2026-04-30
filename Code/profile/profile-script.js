function saveName() {
  const input = document.getElementById("nameInput");
  const name = input?.value || "";

  const nameEl = document.getElementById("name");
  if (nameEl) nameEl.textContent = name;

  localStorage.setItem("name", name);
}

function setMaxMinutes() {
  const input = document.getElementById("maxMinutesInput");
  const maxMinutes = Number(input?.value) || 60;

  const maxMinutesEl = document.getElementById("maxMinutes");
  if (maxMinutesEl) maxMinutesEl.textContent = maxMinutes;

  localStorage.setItem("maxMinutes", maxMinutes);
}

window.addEventListener("DOMContentLoaded", () => {

  // NAME
  const savedName = localStorage.getItem("name");

  const nameEl = document.getElementById("name");
  const nameInput = document.getElementById("nameInput");

  if (savedName) {
    if (nameEl) nameEl.textContent = savedName;
    if (nameInput) nameInput.value = savedName;
  }

  // MAX MINUTES
  const savedMaxMinutes = localStorage.getItem("maxMinutes") || "60";

  const maxMinutesEl = document.getElementById("maxMinutes");
  const maxMinutesInput = document.getElementById("maxMinutesInput");

  if (savedMaxMinutes) {
    if (maxMinutesEl) maxMinutesEl.textContent = savedMaxMinutes;
    if (maxMinutesInput) maxMinutesInput.value = savedMaxMinutes;
  }

  // AVATAR
  const input = document.getElementById("fileInput");
  const img = document.getElementById("avatarImg");

  const savedAvatar = localStorage.getItem("avatar");
  if (savedAvatar && img) {
    img.src = savedAvatar;
  }

  if (input) {
    input.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        const dataUrl = reader.result;

        if (img) img.src = dataUrl;
        localStorage.setItem("avatar", dataUrl);
      };

      reader.readAsDataURL(file);
    });
  }

});