/**
 * Represents the view for the user's wishlist in the application.
 * @class
 */
export class WishlistView {
  constructor() {
    // Initializes a new instance of WishlistView
  }

  /**
   * Renders the wishlist view element with all its child components.
   * @async
   * @returns {Promise<HTMLDivElement>} The rendered wishlist view element.
   */
  async render() {
    const wishlistViewElm = document.createElement("div");
    wishlistViewElm.id = "wishlist-view";

    const wishlistContainerElm = document.createElement("div");
    wishlistContainerElm.id = "wishlist-container";

    wishlistViewElm.appendChild(wishlistContainerElm);

    const wishlist = new Wishlist();
    wishlistContainerElm.appendChild(await wishlist.render());

    wishlistViewElm.appendChild(wishlistContainerElm);

    return wishlistViewElm;
  }
}

/**
 * Represents the wishlist component within the wishlist view.
 * @class
 */
class Wishlist {
  constructor() {
    // Initializes a new instance of Wishlist
  }

  /**
   * Renders the wishlist component with its content.
   * @async
   * @returns {Promise<HTMLDivElement>} The rendered wishlist element.
   */
  async render() {
    const wishlistElm = document.createElement("div");
    wishlistElm.id = "wishlist";
    wishlistElm.classList.add("view");

    const textElm = document.createElement("h1");
    textElm.innerText = "This is the wishlist";

    wishlistElm.appendChild(textElm);

    return wishlistElm;
  }
}
