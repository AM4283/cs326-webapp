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
    this.cart = {};
    this.cartElem = document.createElement("div");
  }
  async render() {
    this.cartElem.id = "cart";
    this.cartElem.classList.add("view");

    //const searchInput = document.getElementById("search-bar").value;
    //this.cart = fetch cart;
    const user = localStorage.getItem("currentUser");
    const response = await fetch(`/api/load_cart?user=${user}`, { method: "GET" });
    this.cart = await response.json();
    // this.cartElem.appendChild(
    //   this.renderSearchResultTools(searchInput),
    // );

    this.cartElem.appendChild(
      await this.renderCart(this.cart),
    );

    return this.cartElem;
  }

  /**
   * Renders the cart component with its content.
   * @async
   * @returns {Promise<HTMLDivElement>} The rendered cart element.
   */
  async renderCart(cart) {
    const cartElm = document.createElement("div");
    cartElm.id = "cartItems";
    cartElm.classList.add("view");

    const user = localStorage.getItem("currentUser");
    const textElm = document.createElement("h1");
    if(user) {
      textElm.innerText = "Your cart is empty";
      const response = await fetch(`/api/load_cart?user=${user}`, { method: "GET" });
    } else {
      textElm.innerText = "Sign in to view your cart";
    }
    const item = document.createElement("div");
    item.classList.add("card");
    item.classList.add("mb-3");

    let itemRow = document.createElement("div");
    itemRow.classList.add("row");
    itemRow.classList.add("g-0");

    let imageCol = document.createElement("div");
    imageCol.classList.add("col-md-4");

    let image = document.createElement("img");
    image.src = "https://m.media-amazon.com/images/I/51ulmT3YUZL._AC_UY1000_.jpg";
    image.classList.add("search-result-image");

    let itemBodyCol = document.createElement("div");
    itemBodyCol.classList.add("col-md-8");

    let itemBody = document.createElement("div");
    itemBody.classList.add("card-body");

    let itemName = document.createElement("a");
    itemName.innerText = "Joe's USA Womens Heavyweight 6.1-Ounce, 100% Soft Spun Cotton T-Shirts in 19 Colors XS-4XL";
    itemName.href = "https://www.amazon.com/Joes-USA-Heavyweight-6-1-Ounce-T-Shirts/dp/B00SZAV34Y";
    itemName.classList.add("card-title");
    itemName.classList.add("unstyled-link");
    itemName.classList.add("search-result-item-name");

    let itemStore = document.createElement("h6");
    itemStore.innerText = "Amazon";
    itemStore.classList.add("card-subtitle");
    itemStore.classList.add("mb-2");
    itemStore.classList.add("text-body-secondary");

    let itemPrice = document.createElement("p");
    itemPrice.innerText = "$" + 22.99;
    itemPrice.classList.add("card-text");

    let buttonRow = document.createElement("div");
    buttonRow.classList.add("row");

    let addToCartBtnCol = document.createElement("div");
    addToCartBtnCol.classList.add("col");
    buttonRow.appendChild(addToCartBtnCol);

    let addToCartBtn = document.createElement("BUTTON");
    addToCartBtn.innerText = "Remove from Cart";
    addToCartBtn.classList.add("add-to-button");
    addToCartBtn.classList.add("standard-button");
    addToCartBtn.id = "cart_button_" + "https://www.amazon.com/Joes-USA-Heavyweight-6-1-Ounce-T-Shirts/dp/B00SZAV34Y";
    // addToCartBtn.addEventListener("click", () => {
    //   this.addToCart(cart[i]);
    // });
    addToCartBtnCol.appendChild(addToCartBtn);

    itemBody.appendChild(itemName);
    itemBody.appendChild(itemStore);
    itemBody.appendChild(itemPrice);
    itemBody.appendChild(buttonRow);
    imageCol.appendChild(image);
    itemBodyCol.appendChild(itemBody);
    itemRow.appendChild(imageCol);
    itemRow.appendChild(itemBodyCol);
    item.appendChild(itemRow);
    //allResults.appendChild(item);

    cartElm.appendChild(item);
    return cartElm;
  }
}
