/**
 * Represents the view for the user's cart in the application.
 * @class
 */
export class CartView {
  constructor() {
    // Initializes a new instance of CartView
  }

  /**
   * Renders the cart view element with all its child components.
   * @async
   * @returns {Promise<HTMLDivElement>} The rendered cart view element.
   */
  async render() {
    const cartViewElm = document.createElement("div");
    cartViewElm.id = "cart-view";

    const cartContainerElm = document.createElement("div");
    cartContainerElm.id = "cart-container";

    cartViewElm.appendChild(cartContainerElm);

    const cart = new Cart();
    cartContainerElm.appendChild(await cart.render());

    cartViewElm.appendChild(cartContainerElm);

    return cartViewElm;
  }
}

/**
 * Represents the cart component within the cart view.
 * @class
 */
class Cart {
  constructor() {
    // Initializes a new instance of Cart
  }

  /**
   * Renders the cart component with its content.
   * @async
   * @returns {Promise<HTMLDivElement>} The rendered cart element.
   */
  async render() {
    const cartElm = document.createElement("div");
    cartElm.id = "cart";
    cartElm.classList.add("view");

    const user = localStorage.getItem("currentUser");
    const textElm = document.createElement("h1");
    if(user) {
      textElm.innerText = "Your cart is empty";
    } else {
      textElm.innerText = "Sign in to view your cart";
    }
    

    cartElm.appendChild(textElm);

    return cartElm;
  }
}
