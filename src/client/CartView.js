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
    console.log("rendering cart view");
    const cartViewElm = document.createElement("div");
    cartViewElm.id = "cart-view";

    const cartContainerElm = document.createElement("div");
    cartContainerElm.id = "cart-container";

    cartViewElm.appendChild(cartContainerElm);

    const cart = new Cart();
    cartContainerElm.appendChild(await cart.render());
    console.log("returned rendered cart");
    cartViewElm.appendChild(cartContainerElm);
    console.log("returning rendered cartview")
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
    console.log("rendering cart");
    this.cartElem.id = "cart";
    this.cartElem.classList.add("view");
    console.log("trying to render list");
    this.cartElem.appendChild(
      await this.renderCart(), //this.cart
    );
    console.log("should have rendered");
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
    console.log("rendering cart list");
    const cartElm = document.createElement("div");
    cartElm.id = "cartItems";
    cartElm.classList.add("view");

    const textElm = document.createElement("h1");
    if(user) {
      console.log(`user is ${user}`);
      try {
        const response = await fetch(`/api/load_cart?user=${user}`, { method: "GET" });
        const data = await response.json();
        console.log(`data is ${data}`);
        userCart = data.userCart;
      } catch (e) {
        console.log(`error loading cart in rendercart: ${e}`);
        alert("There was an error loading your cart");
        return e;
      }
      if(userCart.rows.length == 0) {
        textElm.innerText = "Your cart is empty";
        cartElm.appendChild(textElm);
        return cartElm;
      }
      
    } else {
      console.log("not user");
      textElm.innerText = "Sign in to view your cart";
      cartElm.appendChild(textElm);
      return cartElm;
    }
    console.log("cartview: user cart");
    console.log(userCart);
    
    userCart.rows.forEach(doc => {
      const cartItem = doc.doc;
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

      let itemStore = document.createElement("h6");
      itemStore.innerText = cartItem.store;
      itemStore.classList.add("card-subtitle");
      itemStore.classList.add("mb-2");
      itemStore.classList.add("text-body-secondary");

      let itemPrice = document.createElement("p");
      itemPrice.innerText = "$" + cartItem.price;
      itemPrice.classList.add("card-text");

      let buttonRow = document.createElement("div");
      buttonRow.classList.add("row");

      let buttonGroupDiv = document.createElement('div')
      buttonGroupDiv.setAttribute('role', "group")

      let minusCartButton = document.createElement('button')
      minusCartButton.classList.add('btn')
      minusCartButton.classList.add('standard-button')
      minusCartButton.innerText = "-";
      minusCartButton.addEventListener("click", () => {
        if(localStorage.getItem(cartItem._id)){
          this.updateQuantity("decrease", cartItem._id);
        } else {
          alert ("Item not in cart.")
        }
      });
      buttonGroupDiv.appendChild(minusCartButton)

      let rmvFromCartBtn = document.createElement('button')
      rmvFromCartBtn.classList.add('btn')
      rmvFromCartBtn.classList.add("add-to-button");
      rmvFromCartBtn.classList.add('standard-button')
      rmvFromCartBtn.id = "cart_button_" + cartItem.link;
      rmvFromCartBtn.innerText = "Remove from Cart";
      rmvFromCartBtn.addEventListener("click", async () => {
          try {
            const response = await fetch(`/api/delete_item?id=${cartItem._id}`, { method: "DELETE" });
            console.log("recieved delete response");
            if(response.status == 200) {
              localStorage.removeItem(cartItem._id);
              console.log('rendercart local storage: removed from cart');
              this.reRender();
            } else {
              alert("Error removing this item from cart");
            }
          } catch (error) {
              alert("There was an error removing this item from your cart.")
              console.error(error);
          }
        });
      buttonGroupDiv.appendChild(rmvFromCartBtn)

      let plusCartButton = document.createElement('button')
      plusCartButton.classList.add('btn')
      plusCartButton.classList.add('standard-button')
      plusCartButton.innerText = "+";
      plusCartButton.addEventListener("click", () => {
        if(localStorage.getItem(cartItem._id)){
          this.updateQuantity("increase", cartItem._id);
        } else {
          alert ("Item not in cart.")
        }
      });
      buttonGroupDiv.appendChild(plusCartButton);

      buttonRow.appendChild(buttonGroupDiv)

      // let addToCartBtnCol = document.createElement("div");
      // addToCartBtnCol.classList.add("col");
      // buttonRow.appendChild(addToCartBtnCol);

      // let addToCartBtn = document.createElement("BUTTON");
      // addToCartBtn.innerText = "Remove from Cart";
      // addToCartBtn.classList.add("add-to-button");
      // addToCartBtn.classList.add("standard-button");
      // addToCartBtn.id = "cart_button_" + cartItem.link;
      // addToCartBtn.addEventListener("click", async () => {
      //   try {
      //     const response = await fetch(`/api/delete_item?id=${cartItem._id}`, { method: "DELETE" });
      //     console.log("recieved delete response");
      //     if(response.status == 200) {
      //       localStorage.removeItem(cartItem._id);
      //       console.log('rendercart local storage: removed from cart');
      //       this.reRender();
      //     } else {
      //       alert("Error removing this item from cart");
      //     }
      //   } catch (error) {
      //       alert("There was an error removing this item from your cart.")
      //       console.error(error);
      //   }
      // });
      // addToCartBtnCol.appendChild(addToCartBtn);

      itemBody.appendChild(itemName);
      itemBody.appendChild(itemStore);
      itemBody.appendChild(itemPrice);
      itemBody.appendChild(buttonRow);
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
    console.log("re-rendering in process");

    this.cartElem.removeChild(document.getElementById("cartItems"));
    this.cartElem.appendChild(
      await this.renderCart(),
    );
  }

  async updateQuantity(type, id) {
    const user = localStorage.getItem("currentUser");
    if(!user) {
      alert("Sign in to add items to cart");
      return;
    }
    try {
      const response = await fetch(`/api/update_quantity?type=${type}&id=${id}`, { method: "PUT" });
      if(response.status == 200) {
        console.log("quantity updated");
      }
      if((await response.json()).deleted) {
        localStorage.removeItem(id);
        this.reRender();
      }

    } catch (e) {
      alert("There was an error updating this item");
      console.error(e);
    }
    
  }
}