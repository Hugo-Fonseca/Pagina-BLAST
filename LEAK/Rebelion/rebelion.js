const sections = {
  general: {
    title: "OPERACIÓN DE REBELIÓN",
    text: "El mundo está en caos y nosotros somos parte del problema, aunque\nsigamos le hacen peor gusto la mayoría es por obligación, pero ya estamos\natrás.\n\nDebemos organizar un golpe de estado para bajar del poder a esos\ninficiles que solo buscan divertirse con el sufrimiento de otros.",
    primary: { label: "APOYÓ A CIVILES", target: "civiles" },
    secondary: { label: "RECLUTAMIENTO DE COLEGAS", target: "colegas" }
  },
  civiles: {
    title: "APOYÓ A CIVILES",
    text: "Primero se priorizará proteger como podamos a los sobrevivientes\nque quedan, sumando el número de civiles caídos del ejército para\nevitar que sigan sufriendo.\n\nAquellos que se encuentren en la capacidad física o intelectual de ayudar\nserán reclutados para dirigir y responder a las comunidades más perjudicadas por el conflicto.",
    previous: "general",
    primary: { label: "RECLUTAMIENTO DE COLEGAS", target: "colegas" }
  },
  colegas: {
    title: "RECLUTAMIENTO DE COLEGAS",
    text: "Mientras tanto...\n\nEn cada batallón, se deben enviar la confianza de todos los que puedan,\nposteriormente, a líderes que serán más sencillo la reclutación. Procurar\nsuministrar al ninguno sea formar sospechas, nunca se debe utilizar\npodría ser un vil traidor.",
    previous: "civiles",
    primary: { label: "PRUEBA DE LEALTAD", target: "lealtad" }
  },
  lealtad: {
    title: "PRIMER PRUEBA DE LEALTAD",
    text: "Luego del reclutamiento...\n\nPara garantizar la lealtad de los involucrados, estos deben enviar\nsumisionarios antes de equipo como alimentos a una zona en especial,\naquellos que lo cumplan, no los pasará pasar nada con lo que no\nseán etiquetados como traidores y serán eliminados inmediatamente para\nevitar filtraciones.",
    previous: "colegas",
    primary: { label: "PRUEBA DEFINITIVA", target: "definitiva" }
  },
  definitiva: {
    title: "PRUEBA DEFINITIVA DE LEALTAD",
    text: "Como última prueba para comprobar que son fieles a la causa es\neliminar a aquellos que no sean rebeldes, ni aquellos que apoyen a los\nlíderes enemigos.",
    warning: "SERÁN ESECUZADOS",
    previous: "lealtad",
    primary: { label: "PLAN PRINCIPAL", target: "plan" }
  },
  plan: {
    title: "PLAN PARA DERROCAR LA DICTADURA",
    text: "Con los aliados reclutados poco a poco se han destruyendo los recursos\ncontrolados por la H.G.A. y los actuales líderes generales, debilitando sus mecanismos de control\na través de sabotajes y ataques coordinados para poder romper sus últimas\npotencias para obligarlos a cambiar el rumbo de sus planes o en su\ndefectos.\n\nEl plan se encuentra en marcha, sin embargo, han llegado noticias de la\núltima reunión de los líderes mandados por el Supremo.",
    previous: "definitiva",
    primary: { label: "INFORMACIÓN FILTRADA", target: "filtrada" }
  },
  filtrada: {
    title: "INFORMACIÓN FILTRADA",
    text: "Información clasificada obtenida desde la red interna.",
    previous: "plan",
    primary: { label: "IR A ALERTA", target: "alerta" }
  },
  novedades: {
    title: "NOVEDADES",
    text: "Un sobreviviente cualquiera como personaje está en el plan a favor.\n\nSe registran nuevos movimientos dentro del conflicto y toda información\nconfirmada será publicada desde este canal.",
    previous: "plan",
    primary: { label: "VOLVER A INDEXLEAK", target: "indexleak" }
  }
};

const params = new URLSearchParams(window.location.search);
const sectionId = params.get("seccion")?.toLowerCase() || "general";
const section = sections[sectionId] || sections.general;

document.title = `${section.title} | Rebelión de soldados`;
document.querySelector("#rebelion-title").textContent = section.title;
document.querySelector("#rebelion-text").textContent = section.text;

const warning = document.querySelector("#rebelion-warning");
warning.textContent = section.warning || "";
warning.hidden = !section.warning;

const previous = document.querySelector("#previous-section");
previous.hidden = !section.previous;
if (section.previous) previous.href = `?seccion=${section.previous}`;

const primary = document.querySelector("#primary-action");
if (section.primary) {
  primary.textContent = section.primary.label;
  if (section.primary.target === "filtrada") primary.href = "../Alerta/alerta.html";
  else if (section.primary.target === "indexleak") primary.href = "../indexleak.html";
  else primary.href = `?seccion=${section.primary.target}`;
} else {
  primary.hidden = true;
}

const secondary = document.querySelector("#secondary-action");
if (section.secondary) {
  secondary.hidden = false;
  secondary.textContent = section.secondary.label;
  secondary.href = `?seccion=${section.secondary.target}`;
} else {
  secondary.hidden = true;
}