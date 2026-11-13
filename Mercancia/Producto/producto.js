const products = [
  {id:"fatality-cards", name:"Fatality Cards", price:25000, image:"FATALITY CARDS.png", description:"El juego de estratégia perfecto para una partida todos contra todos en la vida real. Toma el papel de las potencias mundiales y ataca a tus enemigos para tener el dominio total del mundo. ¡¡El último que quede en pie gana!!"},
  {id:"peluche-pit", name:"Peluche de Pitty", price:30000, image:"peluche pit.png", description:"El tierno Pit acompañará tus aventuras con su mirada curiosa y su pelaje suave. Es muy suave y abrazable. Siempre muy bonito y gordito"},
  {id:"peluche-sasha", name:"Peluche Sasha", price:30000, image:"peluche sasha.png", description:"La pequeña Sasha estará contigo protegiendote de todo mal cerca de ti. Su experiencia en el ejercito la hace una gran guerrera."},
  {id:"figura-soldado", name:"Figura Soldado", price:85000, image:"figura soldado.png", description:"Figura detallada de un soldado de las fuerzas armadas del Oeste Europeo. Su mision obedecer a Nikolai y destruir lo que se interponga con su objetivo, ya sean objetos o personas"},
  {id:"figura-carl", name:"Figura Carl", price:85000, image:"figura carl.png", description:"Figura coleccionable de Carl Hargrove con su compañero Pit. ¡No existe mejor dupla que ellos dos!"},
  {id:"figura-soldado-2", name:"Figura Soldado Al Ataque", price:120000, image:"figura soldado2.png", description:"En momentos caótico, un buen soldado debe siempre permanecer alerta, concentrado y en forma. El honor y la victoria son su motivación para seguir adelante"},
  {id:"poster-fatality-blast", name:"Fatality Blast: The Last Survivor", price:55000, image:"POSTER FATALITY BLAST 1.png", description:"“Fatality Blast: The Last Survivor” es un shooter táctico de supervivencia en tercera persona enfocado en la gestión de recursos en momentos críticos. El jugador se pone en los zapatos de Arthur, un sobreviviente de una letal guerra global que busca encontrar un hogar pacífico alejado lo más posible de toda esta situación."},
  {id:"figura-sasha", name:"Figura Sasha", price:85000, image:"figura sasha1.png", description:"Figura coleccionable de Sasha con su equipamiento característico."},
  {id:"peluche-carl", name:"Peluche Carl", price:30000, image:"peluche carl.png", description:"Carl no es solo un científico brillante, sino también un amigo leal. Este peluche captura su esencia y te acompañará en todas tus aventuras."},
  {id:"figura-carl-2", name:"Figura Carl Con Sus Inventos", price:120000, image:"figura carl2.png", description:"El ingeniero Hargrove siempre está con la cabeza llena de ideas. Cada vez que se le ocurre un nuevo invento, no tardará ni un día en empezar a trabajar en ello. Desde robots que arreglan autos por su cuenta hasta una cafetera que funcione sin luz eléctrica."},
  {id:"peluche-soldado", name:"Peluche Soldado", price:30000, image:"peluche soldado.png", description:"Pueden parecer duros y rudos, pero los soldados también tienen un lado tierno. Este peluche captura la esencia de un soldado aun que sean malvados y crueles, siempre hay un lado tierno que se puede mostrar."},
  {id:"llavero-pit", name:"Llavero Pit", price:12000, image:"llavero pit.png", description:"Un pequeño amuleto de la suerte para que lleves contigo junto a tus llaves, maleta o bolso. Le dá un toque colorido a tu día."},
  {id:"foto-exclusiva", name:"Foto de la Familia Lightny", price:35000, image:"foto.png", description:"Quieres saber como vivía Sasha antes del colapso del mundo, esta foto te revelara más de un secreto."},
  {id:"llavero-soldado", name:"Llavero Soldado", price:12000, image:"llavero soldado.png", description:"Tus llaves se sienten inseguras, pues este llavero mostrara la fuerza y rudeza de un soldado de las fuerzas armadas del Oeste Europeo. ¡Las protegeran siempre!"},
  {id:"diario-clasificado", name:"Diario Clasificado", price:32000, image:"diario clasificado.png", description:"Reproducción del diario y los documentos clasificados del universo B.L.A.S.T."},
  {id:"peluche-familia", name:"Set Familiar de Peluches Lightny", price:65000, image:"Peluche familia.png", description:"Conjunto de peluches inspirados en la familia Lightny, acoge su cariño y afecto que tienen entre si."}
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