export class WishlistView {
    constructor() {}

    async render() {
        const wishlistViewElm = document.createElement('div');
        wishlistViewElm.id = 'wishlist-view';

        const wishlistContainerElm = document.createElement('div');
        wishlistContainerElm.id = 'wishlist-container';

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
        const wishlistElm = document.createElement('div');
        wishlistElm.id = 'wishlist';
        wishlistElm.classList.add('view');

        const textElm = document.createElement('h1');
        textElm.innerText = 'This is the wishlist';

        wishlistElm.appendChild(textElm);

        return wishlistElm;
    }
}