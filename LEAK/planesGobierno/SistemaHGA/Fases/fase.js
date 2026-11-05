const phases = {
  "1": {
    title: "FASE 1.",
    subtitle: "INFILTRACIÓN DIPLOMÁTICA",
    description: "Ganar la confianza de los miembros\nmediante estudios de cooperación.\n\nPosicionar activos en la ONU\npara manipular declaraciones\nestratégicas de cada bando.",
    previous: null,
    next: "2",
    nextLabel: "FASE 2."
  },
  "2": {
    title: "FASE 2.",
    subtitle: "SABOTAJE Y CONTROL TECNOLÓGICO",
    description: "Subornar a los científicos o\ningenieros del proyecto. A.S.A. para que\nmodifiquen el sistema de H.G.A. y sean\nmenos imponentes en batalla.",
    previous: "1",
    previousLabel: "FASE ANTERIOR",
    next: "2b",
    nextLabel: "SI SE NIEGAN"
  },
  "2b": {
    title: "FASE 2B.",
    subtitle: "",
    description: "Amenazar, extorsionar y\npresionar a los científicos e ingenieros\nque se nieguen al sabotaje\nhasta lograr su sometimiento total o\nneutralización.",
    previous: "2",
    previousLabel: "FASE ANTERIOR",
    next: "3",
    nextLabel: "FASE 3."
  },
  "3": {
    title: "FASE 3.",
    subtitle: "GOLPE TÁCTICO",
    description: "Traicionar a la ONU utilizando\nel nuevo sistema manipulando\nel comportamiento humano.\n\nInhabilitar sus defensas principales\ndonde el interior, dejando la\ninfraestructura insegura.",
    previous: "2b",
    previousLabel: "FASE ANTERIOR",
    next: "4",
    nextLabel: "FASE 4."
  },
  "4": {
    title: "FASE 4.",
    subtitle: "DOMINIO MILITAR",
    description: "Implementar el control sobre las\ninstituciones y fuerzas militares\nvitales para asegurar la expansión\nde los activos del sistema.",
    previous: "3",
    previousLabel: "FASE ANTERIOR",
    next: "final",
    nextLabel: "FASE FINAL."
  },
  "final": {
    title: "FASE FINAL.",
    subtitle: "CONTROL ABSOLUTO DE\nLA POBLACIÓN CIVIL",
    description: "Tomar y subyugar a las\nciudades, despojándolos de sus\nrecursos estratégicos y destruyendo\ninfraestructura urbana para facilitar\ncualquier intento de rebelión.",
    previous: "4",
    previousLabel: "FASE ANTERIOR",
    next: "../../../Alerta/alerta.html",
    nextLabel: "PERO QUE ES ESTO?"
  }
};

const params = new URLSearchParams(window.location.search);
const phaseId = params.get("fase")?.toLowerCase() || "1";
const phase = phases[phaseId] || phases["1"];

document.title = `${phase.title} Sistema H.G.A.`;
document.querySelector("#phase-breadcrumb").textContent = phaseId === "2b" ? "2B" : phaseId === "final" ? "FINAL" : phaseId;
document.querySelector("#phase-title").textContent = phase.title;
document.querySelector("#phase-subtitle").textContent = phase.subtitle;
document.querySelector("#phase-description").textContent = phase.description;

const previous = document.querySelector("#previous-phase");
const next = document.querySelector("#next-phase");

function configureAction(element, target, label) {
  if (!target) {
    element.hidden = true;
    return;
  }

  element.hidden = false;
  element.textContent = label;
  element.href = target.includes("/") ? target : `?fase=${target}`;
}

configureAction(previous, phase.previous, phase.previousLabel);
configureAction(next, phase.next, phase.nextLabel);

if (phase.next?.includes("/Alerta/")) {
  next.classList.add("phase-action--special");
  next.addEventListener("click", () => {
    next.classList.add("phase-action--special");
  });
}