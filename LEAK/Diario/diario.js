const pages = [
  {
    image: "../../assets/Leak/diario/1 Nikolai's Blog.png",
    alt: "Primera página de la bitácora: Nikolai's Blog"
  },
  {
    image: "../../assets/Leak/diario/2 Introduction Diary.png",
    alt: "Segunda página de la bitácora: Introduction Diary"
  },
  {
    image: "../../assets/Leak/diario/3 Week 1..png",
    alt: "Tercera página de la bitácora: Week 1"
  },
  {
    image: "../../assets/Leak/diario/4 Week 3..png",
    alt: "Cuarta página de la bitácora: Week 3"
  },
  {
    image: "../../assets/Leak/diario/5 Week 25..png",
    alt: "Quinta página de la bitácora: Week 25"
  },
  {
    image: "../../assets/Leak/diario/6 Week 78..png",
    alt: "Sexta página de la bitácora: Week 78"
  },
  {
    image: "../../assets/Leak/diario/7 Blog Update.png",
    alt: "Séptima página de la bitácora: Blog Update"
  }
];

const storageKey = "blast-general-diary-unlocked";
const pageParam = new URLSearchParams(window.location.search).get("pagina");
const requestedPage = Number(pageParam);

let currentPage;
if (pageParam === null) {
  currentPage = 0;
} else if (requestedPage === 7 && localStorage.getItem(storageKey) === "true") {
  currentPage = 6;
} else if (Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= 6) {
  currentPage = requestedPage - 1;
} else {
  currentPage = 0;
}

const viewer = document.querySelector("#diary-viewer");
const image = document.querySelector("#diary-image");
const previous = document.querySelector("#previous-page");
const next = document.querySelector("#next-page");
const counter = document.querySelector("#page-counter");
const diaryBack = document.querySelector("#diary-back");

function showPage(index, direction) {
  currentPage = Math.max(0, Math.min(pages.length - 1, index));
  viewer.classList.remove("is-turning-forward", "is-turning-backward");
  void viewer.offsetWidth;
  viewer.classList.add(direction < 0 ? "is-turning-backward" : "is-turning-forward");

  image.src = pages[currentPage].image;
  image.alt = pages[currentPage].alt;
  counter.textContent = `${currentPage + 1} / ${pages.length}`;
  previous.hidden = currentPage === 0;
  diaryBack.hidden = currentPage !== pages.length - 1;

  if (currentPage === 5 && localStorage.getItem(storageKey) !== "true") {
    next.setAttribute("aria-label", "Ir a la alerta");
  } else {
    next.setAttribute("aria-label", currentPage === pages.length - 1 ? "Última página" : "Página siguiente");
  }
  next.hidden = currentPage === pages.length - 1;
}

previous.addEventListener("click", () => {
  if (currentPage > 0) {
    showPage(currentPage - 1, -1);
    history.replaceState(null, "", currentPage === 6 ? "?pagina=7" : `?pagina=${currentPage + 1}`);
  }
});

next.addEventListener("click", () => {
  if (currentPage === 5) {
    localStorage.setItem(storageKey, "true");
    window.location.href = "../Alerta/alerta.html";
    return;
  }

  if (currentPage < pages.length - 1) {
    showPage(currentPage + 1, 1);
    history.replaceState(null, "", currentPage === 6 ? "?pagina=7" : `?pagina=${currentPage + 1}`);
  }
});

showPage(currentPage, 1);