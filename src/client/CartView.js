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
  constructor() {
    this.cartElements = []
    this.renderedCart = null
  }

  async render() {
    const cartElem = document.createElement("div");
    cartElem.id = "cart";
    cartElem.classList.add("view");

    

    let isSignedIn = true

    if(isSignedIn) {
      this.cartElements = await this.getCart()
      const textElem = document.createElement("h1");
      textElem.innerText = "Welcome to your cart";
      cartElem.appendChild(textElem);

      await this.renderCart()
      cartElem.appendChild(this.renderedCart)

    } else {
      const textElem = document.createElement("h1");
      textElem.innerText = "Sign in to view your cart...";
      cartElem.appendChild(textElem);
    }

    return cartElem;
  }

  async renderCart(){
    console.log(this.cartElements)

    this.renderedCart = document.createElement('div')
    this.renderedCart.id = 'rendered-cart'

    for (let i = 0; i < this.cartElements.length; ++i) {
        const item = document.createElement("div");
        item.classList.add("card");
        item.classList.add("mb-3");

        let itemRow = document.createElement("div");
        itemRow.classList.add("row");
        itemRow.classList.add("g-0");

        let imageCol = document.createElement("div");
        imageCol.classList.add("col-md-4");

        let image = document.createElement("img");
        image.src = this.cartElements[i].imgAddr;
        image.classList.add("search-result-image");

        let itemBodyCol = document.createElement("div");
        itemBodyCol.classList.add("col-md-8");

        let itemBody = document.createElement("div");
        itemBody.classList.add("card-body");

        let itemName = document.createElement("a");
        itemName.innerText = this.cartElements[i].productName;
        itemName.href = this.cartElements[i].link;
        itemName.classList.add("card-title");
        itemName.classList.add("unstyled-link");
        itemName.classList.add("search-result-item-name");

        let itemStore = document.createElement("h6");
        itemStore.innerText = this.cartElements[i].store;
        itemStore.classList.add("card-subtitle");
        itemStore.classList.add("mb-2");
        itemStore.classList.add("text-body-secondary");

        let itemPrice = document.createElement("p");
        itemPrice.innerText = "$" + this.cartElements[i].price;
        itemPrice.classList.add("card-text");

        let buttonRow = document.createElement('div')
        buttonRow.classList.add('row')
        
        let checkoutBtnCol = document.createElement('div')
        checkoutBtnCol.classList.add('col')
        buttonRow.appendChild(checkoutBtnCol)

        let checkoutBtn = document.createElement("a");
        checkoutBtn.innerText = "Checkout";
        checkoutBtn.classList.add('col')
        checkoutBtn.href = this.cartElements[i].link
        checkoutBtn.classList.add('checkout-button')
        checkoutBtn.classList.add('standard-button')
        checkoutBtnCol.appendChild(checkoutBtn)

        let deleteFromCartCol = document.createElement('div')
        deleteFromCartCol.classList.add('col')
        buttonRow.appendChild(deleteFromCartCol)

        let deleteFromCart = document.createElement("button");
        deleteFromCart.id = "delete_cart_button_" + this.cartElements[i].link;
        deleteFromCart.addEventListener('click', () => { this.deleteFromCart(this.cartElements[i])})
        deleteFromCart.classList.add('delete-from-cart')
        deleteFromCart.classList.add('btn')
        deleteFromCart.classList.add('btn-light')
        deleteFromCart.classList.add('btn-sm')
        deleteFromCart.addEventListener('click', async () => {await this.deleteFromCart(this.cartElements[i])})
        deleteFromCartCol.appendChild(deleteFromCart)

        let deleteImg = document.createElement('img')
        deleteImg.src = 'img/trash-can.png'
        deleteImg.classList.add('delete-from-cart-img')
        deleteFromCart.appendChild(deleteImg)


        itemBody.appendChild(itemName)
        itemBody.appendChild(itemStore)
        itemBody.appendChild(itemPrice)
        itemBody.appendChild(buttonRow)
        imageCol.appendChild(image)
        itemBodyCol.appendChild(itemBody)
        itemRow.appendChild(imageCol)
        itemRow.appendChild(itemBodyCol)
        item.appendChild(itemRow)
        this.renderedCart.appendChild(item)
    }
  }

  async deleteFromCart(cartElement) {
    console.log('deleting from cart')
    this.cartElements = this.cartElements.filter((e) => e.link != cartElement.link)
    this.renderedCart.innerHTML = ''
    await this.renderCart()
  }

  async getCart(){
    console.log('retrieving cart')
    const dummyData = [
      {
          imgAddr: "https://m.media-amazon.com/images/I/51ulmT3YUZL._AC_UY1000_.jpg",
          productName:
          "Joe's USA Womens Heavyweight 6.1-Ounce, 100% Soft Spun Cotton T-Shirts in 19 Colors XS-4XL",
          price: 22.99,
          store: "Amazon",
          link: "https://www.amazon.com/Joes-USA-Heavyweight-6-1-Ounce-T-Shirts/dp/B00SZAV34Y",
      },
      {
          imgAddr:
          "https://imgs.michaels.com/MAM/assets/1/726D45CA1C364650A39CD1B336F03305/img/E6F09D1C8ACB448C8AC3C230D95F63C5/10532473_r.jpg?fit=inside|1280:1280",
          productName: "Gildan® Short Sleeve Adult T-Shirt",
          price: 2.99,
          store: "Michael's",
          link: "https://www.michaels.com/product/gildan-short-sleeve-adult-tshirt-10532473",
      },
      {
          imgAddr:
          "https://www.youngla.com/cdn/shop/products/DSC6847_703010f1-c8dd-427c-bed1-2da951091b9e_1000x.jpg?v=1661967075",
          productName: "414 SIGNATURE TEES",
          price: 36,
          store: "YoungLA",
          link: "https://www.youngla.com/products/414-shortsleeve-signature-logo-shirt?variant=41777845862588&currency=USD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoofMNPSm5fMP2qsIuahzem5oDS-1TgGXQ0HvHeUfYph0Ze3We3YFCU&com_cvv=d30042528f072ba8a22b19c81250437cd47a2f30330f0ed03551c4efdaf3409e",
      }
    ];
    return dummyData
  }
}
