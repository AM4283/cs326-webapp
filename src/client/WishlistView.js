export class WishlistView {
  constructor() {}

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

class Wishlist {
  constructor() {}

  async render() {
    const wishlistElem = document.createElement("div");
    wishlistElem.id = "wishlist";
    wishlistElem.classList.add("view");

    let isSignedIn = true

    if(isSignedIn) {
      const textElem = document.createElement("h1");
      textElem.innerText = "Welcome to your wishlist";
      wishlistElem.appendChild(textElem);
    } else {
      const textElem = document.createElement("h1");
      textElem.innerText = "Sign in to view your wishlist...";
      wishlistElem.appendChild(textElem);
    }

    return wishlistElem;
  }
}
