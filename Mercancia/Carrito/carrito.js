const cartKey = "fca-cart";
const imageBase = "../../assets/Mercancia/";
const money = new Intl.NumberFormat("es-CO", {style:"currency", currency:"COP", maximumFractionDigits:0});
const itemsContainer = document.querySelector("#cart-items");
const totalElement = document.querySelector("#cart-total");
const statusElement = document.querySelector("#cart-status");
let cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

function saveCart() {
  localStorage.setItem(cartKey, JSON.stringify(cart));
  renderCart();
}

function cartTotal() {
  return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
}

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
}

function payItem(id) {
  const item = cart.find((product) => product.id === id);
  if (!item) return;
  statusElement.textContent = `${item.name} preparado para pago.`;
  removeItem(id);
}

function renderCart() {
  if (!cart.length) {
    itemsContainer.innerHTML = '<div class="empty-cart">Tu carrito está vacío.</div>';
    totalElement.textContent = money.format(0);
    document.querySelector("#pay-all").disabled = true;
    return;
  }

  document.querySelector("#pay-all").disabled = false;
  itemsContainer.innerHTML = cart.map((item) => {
    const quantity = item.quantity || 1;
    const price = item.price * quantity;
    return `<article class="cart-item">
      <div class="cart-item__image"><img src="${imageBase + item.image}" alt="${item.name}"></div>
      <div class="cart-item__info">
        <h2 class="cart-item__name">${item.name}${quantity > 1 ? ` <small>x${quantity}</small>` : ""}</h2>
        <strong class="cart-item__price">${money.format(price)} COP</strong>
        <div class="cart-item__actions">
          <button type="button" data-pay-item="${item.id}">Pagar</button>
          <button class="cancel-button" type="button" data-remove-item="${item.id}">Cancelar</button>
        </div>
      </div>
    </article>`;
  }).join("");
  totalElement.textContent = money.format(cartTotal()) + " COP";
}

itemsContainer.addEventListener("click", (event) => {
  const payButton = event.target.closest("[data-pay-item]");
  const removeButton = event.target.closest("[data-remove-item]");
  if (payButton) payItem(payButton.dataset.payItem);
  if (removeButton) removeItem(removeButton.dataset.removeItem);
});

document.querySelector("#pay-all").addEventListener("click", () => {
  if (!cart.length) return;
  statusElement.textContent = `Pedido por ${money.format(cartTotal())} preparado para pago.`;
  cart = [];
  saveCart();
});

renderCart();