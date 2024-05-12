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
    if (DEBUG) console.log("rendering cart view");
    const cartViewElm = document.createElement("div");
    cartViewElm.id = "cart-view";

    const cartContainerElm = document.createElement("div");
    cartContainerElm.id = "cart-container";

    cartViewElm.appendChild(cartContainerElm);

    const cart = new Cart();
    cartContainerElm.appendChild(await cart.render());
    if (DEBUG) console.log("returned rendered cart");
    cartViewElm.appendChild(cartContainerElm);
    if (DEBUG) console.log("returning rendered cartview")
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
    if (DEBUG) console.log("rendering cart");
    this.cartElem.id = "cart";
    this.cartElem.classList.add("view");
    if (DEBUG) console.log("trying to render list");
    this.cartElem.appendChild(
      await this.renderCart(), //this.cart
    );
    if (DEBUG) console.log("should have rendered");
    return this.cartElem;
  }

  /**
   * Renders the cart component with its content.
   * @async
   * @returns {Promise<HTMLDivElement>} The rendered cart element.
   */
  async renderCart() {
    const user = localStorage.getItem("currentUser");

    let userCart = undefined;
    if (DEBUG) console.log("rendering cart list");
    const cartElm = document.createElement("div");
    cartElm.id = "cartItems";
    cartElm.classList.add("view");

    const textElm = document.createElement("h1");
    if(user) {
      if (DEBUG) console.log(`user is ${user}`);
      try {
        const response = await fetch(`/api/load_cart?user=${user}`, { method: "GET" });
        const data = await response.json();
        if (DEBUG) console.log(`data is ${data}`);
        userCart = data.userCart;
      } catch (e) {
        console.error(`error loading cart in renderCart: ${e}`);
        alert("There was an error loading your cart");
        return e;
      }
      if(userCart.rows.length == 0) {
        textElm.innerText = "Your cart is empty";
        cartElm.appendChild(textElm);
        return cartElm;
      }
      
    } else {
      if (DEBUG) console.log("not user");
      textElm.innerText = "Sign in to view your cart";
      cartElm.appendChild(textElm);
      return cartElm;
    }
    if (DEBUG) {
      console.log("cart view: user cart");
      console.log(userCart);
    }
    userCart.rows.forEach(async doc => {
      const cartItem = doc.doc;
      if (DEBUG) console.log(cartItem)
      const item = document.createElement("div");
      item.classList.add("card");
      item.classList.add("mb-3");

      let itemRow = document.createElement("div");
      itemRow.classList.add("row");
      itemRow.classList.add("g-0");

      let imageCol = document.createElement("div");
      imageCol.classList.add("col-md-4");

      let image = document.createElement("img");
      image.src = cartItem.img;
      image.classList.add("search-result-image");

      let itemBodyCol = document.createElement("div");
      itemBodyCol.classList.add("col-md-8");

      let itemBody = document.createElement("div");
      itemBody.classList.add("card-body");

      let itemName = document.createElement("a");
      itemName.innerText = cartItem.product;
      itemName.href = cartItem.link;
      itemName.classList.add("card-title");
      itemName.classList.add("unstyled-link");
      itemName.classList.add("search-result-item-name");
      itemBody.appendChild(itemName);

      let itemStore = document.createElement("h6");
      itemStore.innerText = cartItem.store;
      itemStore.classList.add("card-subtitle");
      itemStore.classList.add("mb-2");
      itemStore.classList.add("text-body-secondary");
      itemBody.appendChild(itemStore);

      let itemPrice = document.createElement("p");
      itemPrice.innerText = "$" + cartItem.price;
      itemPrice.classList.add("card-text");
      itemBody.appendChild(itemPrice);

      let buttonRow = document.createElement("div");
      buttonRow.classList.add("row");
      itemBody.appendChild(buttonRow);

      let rmvFromCartBtn = document.createElement('button')
      rmvFromCartBtn.classList.add('btn')
      rmvFromCartBtn.classList.add("add-to-button");
      rmvFromCartBtn.classList.add('standard-button')
      rmvFromCartBtn.id = "cart_button_" + cartItem.id;
      rmvFromCartBtn.addEventListener("click", async () => {
            try {
              const response = await fetch(`/api/delete_item?id=${cartItem._id}`, { method: "DELETE" });
              if (DEBUG) console.log("received delete response");
              if(response.status == 200) {
                localStorage.removeItem(cartItem._id);
                if (DEBUG) console.log('rendercart local storage: removed from cart');
                this.reRender();
              } else {
                alert("Error removing this item from cart");
              }
            } catch (error) {
                alert("There was an error removing this item from your cart.")
                console.error(error);
            }
          });
      rmvFromCartBtn.innerText = "Remove from Cart";
      buttonRow.appendChild(rmvFromCartBtn)
      

      let quantitySelector = document.createElement("select");
      quantitySelector.name = "sort";
      quantitySelector.innerText = "1";
      quantitySelector.id = "quantity_" + cartItem._id;
      
      itemBody.appendChild(quantitySelector);
  
      const optionList = ["1", "2", "3", '4', '5', '6', '7', '8', '9', '10'];
      for (let i = 0; i < optionList.length; i++) {
        const option = document.createElement("option");
        option.value = optionList[i];
        option.innerText = optionList[i];
        quantitySelector.appendChild(option);
      }
      quantitySelector.value= await this.getQuantity(cartItem._id);
      if (DEBUG) console.log('item quantity: ' + await this.getQuantity(cartItem._id))
      quantitySelector.addEventListener("change", () => {
        if (DEBUG) console.log('updating quantity for this item')
        this.updateQuantity(cartItem._id, quantitySelector.value)
      });

      imageCol.appendChild(image);
      itemBodyCol.appendChild(itemBody);
      itemRow.appendChild(imageCol);
      itemRow.appendChild(itemBodyCol);
      item.appendChild(itemRow);

      cartElm.appendChild(item);
    });

    return cartElm;
  }

  async reRender() {
    if (DEBUG) console.log("re-rendering in process");

    this.cartElem.removeChild(document.getElementById("cartItems"));
    this.cartElem.appendChild(
      await this.renderCart(),
    );
  }

  async updateQuantity(id, quantity) {
    try {
      const response = await fetch(`/api/update_quantity?id=${id}&quantity=${quantity}`, { method: "PUT" });
      if(response.status == 200 && DEBUG) {
        console.log("quantity updated");
      }
      if((await response.json()).deleted) {
        localStorage.removeItem(id);
        // this.reRender();
      }

    } catch (e) {
      alert("There was an error updating this item");
      console.error(e);
    }
    
  }

  async getQuantity(id) {
    const user = localStorage.getItem("currentUser");
    if(!user) {
      return 0;
    }
    if (DEBUG) console.log('getting the quantity for ' + id)
    const response = await fetch(`/api/get_quantity?id=${id}`, { method: "GET" });
    const quantity = (await response.json()).quantity;
    if (DEBUG) console.log(quantity);
    return quantity;
  }
}