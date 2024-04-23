export class CartView {
  constructor() {}

  async render() {
    const cartViewElm = document.createElement("div");
    cartViewElm.id = "cart-view";
    //cartViewElm.className = 'view';

    // const titleElm = document.createElement('h1');
    // titleElm.innerText = 'Cart';

    const cartContainerElm = document.createElement("div");
    cartContainerElm.id = "cart-container";

    //cartViewElm.appendChild(titleElm);
    cartViewElm.appendChild(cartContainerElm);

    const cart = new Cart();
    cartContainerElm.appendChild(await cart.render());

    cartViewElm.appendChild(cartContainerElm);

    return cartViewElm;
  }
}

class Cart {
  constructor() {}

  async render() {
    const cartElm = document.createElement("div");
    cartElm.id = "cart";
    cartElm.classList.add("view");

    const textElm = document.createElement("h1");
    textElm.innerText = "This is the cart";

    cartElm.appendChild(textElm);

    return cartElm;
  }
}
