const songPlayer = document.querySelector("[data-song-player]");

if (songPlayer) {
  const returnKey = `song-player:return:${songPlayer.dataset.songId}`;
  const status = document.querySelector(".song-player__status");

  window.addEventListener("pagehide", () => {
    const wasPlaying = !songPlayer.paused && !songPlayer.ended;
    sessionStorage.setItem(returnKey, wasPlaying ? "1" : "0");
    songPlayer.pause();
    songPlayer.currentTime = 0;
  });

  window.addEventListener("pageshow", () => {
    const shouldRestart = sessionStorage.getItem(returnKey) === "1";
    sessionStorage.removeItem(returnKey);
    songPlayer.pause();
    songPlayer.currentTime = 0;

    if (shouldRestart) {
      songPlayer.play().catch((error) => {
        status.textContent = error.name === "NotAllowedError"
          ? "El navegador bloqueó la reproducción automática. Pulsa reproducir para escuchar."
          : "No se pudo iniciar la canción. Usa los controles para intentarlo de nuevo.";
      });
    }
  });
}
