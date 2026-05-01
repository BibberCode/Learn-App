if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker aktiv"))
    .catch(err => console.log("SW Fehler:", err));
}