import { WishlistView } from "./WishlistView.js";
import { HomeView } from "./HomeView.js";
import { SearchResultsView } from "./searchResultsView.js";

document.addEventListener("DOMContentLoaded", () => {
  async function navigate(viewID) {
    const viewsElm = document.getElementById("views");
    viewsElm.innerHTML = "";
    let view = null;
    if (viewID === "home") {
      view = new HomeView();
    } else if (viewID === "wishlist") {
      view = new WishlistView();
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
  if(!user) {
    
  }

  const userCart = await db.allDocs({
    include_docs: true,
    startkey: user + '_cart_',
    endkey: user+"_cart_\uffff"
  });
  if(userCart.rows.length != 0) { 
    cartContainer.innerHTML = "";
    console.log("user cart"); 
  } else { 
    cartContainer.innerHTML = "";
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
    header.innerHTML = "Your cart is empty";
    message.appendChild(header);
    cartContainer.appendChild(message);
    //cartContainer.innerHTML = "Your cart is empty";
    console.log("cart empty"); 
    return;
  }
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
    price.innerHTML = item.doc.price;
    info.appendChild(price);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.classList.add("btn");  
    removeButton.classList.add("btn-sm");
    removeButton.classList.add("btn-outline-primary");
    removeButton.id = "inner-cart-remove-btn";
    removeButton.innerHTML = "Remove";
    info.appendChild(removeButton);

    row.appendChild(info);

    cartContainer.appendChild(listGroup);
  })
}

const cartButton = document.getElementById("cartButton");
cartButton.addEventListener("click", renderCart);