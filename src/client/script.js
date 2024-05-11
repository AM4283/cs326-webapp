import { CartView } from "./CartView.js";
import { HomeView } from "./HomeView.js";
import { SearchResultsView } from "./searchResultsView.js";
//import db from "../server/database.js";

document.addEventListener("DOMContentLoaded", () => {
  async function navigate(viewID) {
    const viewsElm = document.getElementById("views");
    viewsElm.innerHTML = "";
    let view = null;
    if (viewID === "home") {
      view = new HomeView();
    } else if (viewID === "wishlist") {
      view = new CartView();
    } else if (viewID === "searchResults") {
      view = new SearchResultsView();
    }
    viewsElm.appendChild(await view.render());
  }

  function setLinks(links) {
    links.forEach((link) => {
      link.addEventListener("click", async (e) => {
        e.preventDefault();
        const href = e.target.getAttribute("href");
        if (href) {
          const view = href.replace("#", "");
          window.location.hash = view;
          navigate(view);
        }
      });
    });
  }

  const menu = document.getElementById("menu");
  const menuLinks = menu.querySelectorAll("a");
  setLinks(menuLinks);
  const searchLink = document.getElementById("search-button");
  setLinks([searchLink]);

  navigate("home");
});

async function renderCart() {
  const cartContainer = document.getElementById("cartList");
  const user = localStorage.getItem("currentUser");

  try {
    const response = await fetch(`/api/load_cart?user=${user}`, { method: "GET" });
    const data = await response.json();
    console.log(`data is ${data}`);
    const userCart = data.userCart;
  } catch (e) {
    console.log(`error loading cart in rendercart: ${e}`);
    alert("There was an error loading your cart");
  }
  
  cartContainer.innerHTML = "";
  if(userCart.rows.length == 0) { 
    const listGroup = document.createElement("li");
    listGroup.classList.add("list-group-item");

    const row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("align-items-center");
    listGroup.appendChild(row);
    const message = document.createElement("div");
    message.classList.add("col-8");

    const header = document.createElement("h6");
    header.classList.add("mb-1");
    if(user) {
      header.innerHTML = "Your cart is empty";
      message.appendChild(header);
    }
    else {
      header.innerHTML = "Please sign in to view your cart"
      message.appendChild(header);
    }
    cartContainer.appendChild(message);
    console.log("cart empty"); 
    return;
  }
  console.log("user cart");
  console.log(userCart);
  userCart.rows.forEach(item => {
    const listGroup = document.createElement("li");
    listGroup.classList.add("list-group-item");

    const row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("align-items-center");
    listGroup.appendChild(row);

    const col = document.createElement("div");
    col.classList.add("col-4");
    row.appendChild(col);

    const image = document.createElement("img");
    image.src = item.doc.img;
    image.alt = item.doc.product;
    image.classList.add("img-fluid");
    col.appendChild(image);

    const info = document.createElement("div");
    info.classList.add("col-8");

    const header = document.createElement("h6");
    header.classList.add("mb-1");
    header.innerHTML = item.doc.product;
    info.appendChild(header);

    const price = document.createElement("p");
    price.classList.add("mb-1");
    price.innerHTML = '$' + item.doc.price;
    info.appendChild(price);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.classList.add("btn");  
    removeButton.classList.add("btn-sm");
    removeButton.classList.add("btn-outline-primary");
    removeButton.id = "inner-cart-remove-btn";
    removeButton.innerHTML = "Remove";
    info.appendChild(removeButton);
    removeButton.addEventListener("click", async () => {
      try {
        const response = await fetch(`/api/delete_item?id=${item.id}`, { method: "DELETE" });
        console.log("recieved delete response");
        if(response.status == 200) {
          localStorage.removeItem(item.id);
          console.log('rendercart local storage: removed from cart');
          renderCart();
        } else {
          alert("Error removing this item from cart");
        }
      } catch (error) {
          alert("There was an error removing this item from your cart.")
          console.error(error);
      }
    });
    row.appendChild(info);

    cartContainer.appendChild(listGroup);
  })
}

const cartButton = document.getElementById("cartButton");
cartButton.addEventListener("click", renderCart);
//cartButton.addEventListener("click", )
const sideCartButton = document.getElementById("side-cartButton");
sideCartButton.addEventListener("click", renderCart);