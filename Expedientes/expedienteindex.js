// Mantiene una sola ficha abierta para que sea más fácil leer la información.
const dossierDetails = document.querySelectorAll(".dossier-card__more");

dossierDetails.forEach((currentDetails) => {
  currentDetails.addEventListener("toggle", () => {
    if (!currentDetails.open) return;

    dossierDetails.forEach((otherDetails) => {
      if (otherDetails !== currentDetails) {
        otherDetails.open = false;
      }
    });
  });
});
