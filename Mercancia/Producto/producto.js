const products = [
  {id:"fatality-cards", name:"Fatality Cards", price:25000, image:"FATALITY CARDS.png", description:"Mazo coleccionable inspirado en los personajes y escenas de Fatality Blast."},
  {id:"peluche-pit", name:"Peluche de Pitty", price:30000, image:"peluche pit.png", description:"El tierno Pit acompañará tus aventuras con su mirada curiosa y su pelaje suave."},
  {id:"peluche-sasha", name:"Peluche Sasha", price:30000, image:"peluche sasha.png", description:"Peluche coleccionable basado en Sasha Lightny."},
  {id:"figura-soldado", name:"Figura Soldado", price:85000, image:"figura soldado.png", description:"Figura detallada de un soldado de las fuerzas armadas del Oeste Europeo."},
  {id:"figura-carl", name:"Figura Carl", price:85000, image:"figura carl.png", description:"Figura coleccionable de Carl Hargrove con su compañero Pit."},
  {id:"figura-soldado-2", name:"Figura Soldado 2", price:85000, image:"figura soldado2.png", description:"Versión alternativa de la figura coleccionable del soldado."},
  {id:"poster-fatality-blast", name:"Póster Fatality Blast", price:22000, image:"POSTER FATALITY BLAST 1.png", description:"Póster oficial con la identidad visual de Fatality Blast."},
  {id:"figura-sasha", name:"Figura Sasha", price:85000, image:"figura sasha1.png", description:"Figura coleccionable de Sasha con su equipamiento característico."},
  {id:"peluche-carl", name:"Peluche Carl", price:30000, image:"peluche carl.png", description:"Peluche suave inspirado en Carl Hargrove."},
  {id:"figura-carl-2", name:"Figura Carl 2", price:95000, image:"figura carl2.png", description:"Escena de colección de Carl Hargrove trabajando en su laboratorio mecánico."},
  {id:"peluche-soldado", name:"Peluche Soldado", price:30000, image:"peluche soldado.png", description:"Peluche coleccionable inspirado en los soldados de B.L.A.S.T."},
  {id:"llavero-pit", name:"Llavero Pit", price:12000, image:"llavero pit.png", description:"Llavero compacto con la imagen de Pit para tus llaves o mochila."},
  {id:"foto-exclusiva", name:"Foto Exclusiva", price:18000, image:"foto.png", description:"Fotografía exclusiva de los personajes de Fatality Blast."},
  {id:"llavero-soldado", name:"Llavero Soldado", price:12000, image:"llavero soldado.png", description:"Llavero coleccionable con el emblema del soldado."},
  {id:"diario-clasificado", name:"Diario Clasificado", price:32000, image:"diario clasificado.png", description:"Reproducción del diario y los documentos clasificados del universo B.L.A.S.T."},
  {id:"peluche-familia", name:"Set Familiar", price:65000, image:"Peluche familia.png", description:"Conjunto de peluches inspirados en los personajes principales."}
];
const params = new URLSearchParams(window.location.search);
let current = products.find((product) => product.id === params.get("id")) || products[1];
const imageBase = "../../assets/Mercancia/";
const image = document.querySelector("#product-image"); image.src = imageBase + current.image; image.alt = current.name;
if (current.image.toLowerCase().includes("llavero")) image.classList.add("is-keychain");
if (current.image.toLowerCase().includes("figura sasha") || current.image.toLowerCase().includes("peluche sasha")) image.classList.add("is-tall-product");
document.querySelector("#product-name").textContent = current.name;
document.querySelector("#product-description").textContent = current.description;
document.querySelector("#product-price").textContent = new Intl.NumberFormat("es-CO", {style:"currency", currency:"COP", maximumFractionDigits:0}).format(current.price);
document.title = `${current.name} | FCA Studios`;
document.querySelector("#add-to-cart").addEventListener("click", () => { const cart = JSON.parse(localStorage.getItem("fca-cart") || "[]"); const existing = cart.find((item) => item.id === current.id); if(existing) existing.quantity += 1; else cart.push({id:current.id,name:current.name,price:current.price,image:current.image,quantity:1}); localStorage.setItem("fca-cart", JSON.stringify(cart)); document.querySelector("#cart-message").textContent = `${current.name} fue agregado al carrito.`; });
const suggestions = products.filter((product) => product.id !== current.id).sort(() => Math.random() - 0.5).slice(0, 2);
document.querySelector("#suggested-products").innerHTML = suggestions.map((product) => {
  const keychainClass = product.image.toLowerCase().includes("llavero") ? " is-keychain" : "";
  return `<article class="suggestion-card"><div class="suggestion-card__image"><img class="${keychainClass.trim()}" src="${imageBase + product.image}" alt="${product.name}"></div><h3>${product.name}</h3><a href="producto.html?id=${product.id}">Ver más</a></article>`;
}).join("");