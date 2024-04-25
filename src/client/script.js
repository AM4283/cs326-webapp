import { WishlistView } from "./WishlistView.js";
import { CartView } from "./CartView.js";
import { HomeView } from "./HomeView.js";
import { SearchResultsView } from "./searchResultsView.js";
//Document Elements
const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");
const searchResults = document.getElementById("search-results");

//Event listeners
searchButton.addEventListener("click", performSearch);

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
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRaUPEdncqagVKDPJwn7CYlPQgB7FZiZcFarUSemBTluB7R2BYLDZ27YcLzMJ3YU1VdVE6mCRjAQZ0ABr2YLI5dnNkqGOXl4w&usqp=CAE",
    productName: "Gildan Adult T-Shirt- Irish Green, Medium",
    price: 2.99,
    store: "Michael's",
    link: "https://www.google.com/shopping/product/17037593256595950687?sca_esv=09379ecd0b6efd91&rlz=1C5CHFA_enUS1095US1096&q=tshirt&prmd=isvnmbtz&ictx=111&biw=1470&bih=799&dpr=2&prds=eto:936709633924396750_0,local:1,pid:8696953559967210556,prmr:2,rsk:PC_54960136803964818&sa=X&ved=0ahUKEwjw5eKAj8-FAxUzEVkFHcMtBEgQ8wIIvhY",
  },
  {
    imgAddr:
      "https://img.abercrombie.com/is/image/anf/KIC_124-4234-0221-330_prod1.jpg?policy=product-large",
    productName: "Premium Heavyweight Tee",
    price: 34,
    store: "Abercrombie & Finch",
    link: "https://www.abercrombie.com/shop/us/p/premium-heavyweight-tee-52129319?seq=01&source=googleshopping",
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
      "https://img.hollisterco.com/is/image/anf/KIC_323-4106-0208-200_prod1.jpg?policy=product-large",
    productName: "BOXY PALM SPRINGS GRAPHIC TEE",
    price: 15,
    store: "Hollister",
    link: "https://www.hollisterco.com/shop/us/p/boxy-coney-island-new-york-graphic-tee-53781825?seq=01&utm_source=googleshopping",
  },
  {
    imgAddr:
      "https://www.youngla.com/cdn/shop/products/DSC6847_703010f1-c8dd-427c-bed1-2da951091b9e_1000x.jpg?v=1661967075",
    productName: "414 SIGNATURE TEES",
    price: 36,
    store: "YoungLA",
    link: "https://www.youngla.com/products/414-shortsleeve-signature-logo-shirt?variant=41777845862588&currency=USD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOoofMNPSm5fMP2qsIuahzem5oDS-1TgGXQ0HvHeUfYph0Ze3We3YFCU&com_cvv=d30042528f072ba8a22b19c81250437cd47a2f30330f0ed03551c4efdaf3409e",
  },
  {
    imgAddr:
      "https://s7d2.scene7.com/is/image/aeo/5494_3357_012_f?$pdp-mdg-opt$&fmt=webp",
    productName: "Aerie Graphic Oversized Boyfriend T-Shirt",
    price: 26.95,
    store: "Aerie",
    link: "https://www.ae.com/us/en/p/aerie/tops/t/aerie-graphic-oversized-boyfriend-t/5494_3357_012?menu=cat4840006&ip=off",
  },
];

function performSearch() {
  const input = searchBar.value;
  // window.location.replace("http://127.0.0.1:3000/client/searchResults.html?");
  console.log(input);
  const collectedData = dummyData;
  console.log(collectedData.length);
  document.getElementById("search-results-info").innerText =
    "Search Results for " +
    input +
    ". " +
    collectedData.length +
    " results found.";

  for (let i = 0; i < collectedData.length; ++i) {
    //create an html element for each of the search results
    let item = document.createElement("div");
    item.classList.add("card");
    item.classList.add("mb-3");
    // item.style = 'width: 18rem;'

    let itemRow = document.createElement("div");
    itemRow.classList.add("row");
    itemRow.classList.add("g-0");

    let imageCol = document.createElement("div");
    imageCol.classList.add("col-md-4");

    let image = document.createElement("img");
    image.src = collectedData[i].imgAddr;
    image.classList.add("search-result-image");
    image.style = "max-height:300px;";

    let itemBodyCol = document.createElement("div");
    itemBodyCol.classList.add("col-md-8");

    let itemBody = document.createElement("div");
    itemBody.classList.add("card-body");

    let itemName = document.createElement("a");
    itemName.innerText = collectedData[i].productName;
    itemName.href = collectedData[i].link;
    itemName.classList.add("card-title");
    itemName.classList.add("unstyled-link");
    itemName.classList.add("search-result-item-name");

    let itemStore = document.createElement("h6");
    itemStore.innerText = collectedData[i].store;
    itemStore.classList.add("card-subtitle");
    itemStore.classList.add("mb-2");
    itemStore.classList.add("text-body-secondary");

    let itemPrice = document.createElement("p");
    itemPrice.innerText = "$" + collectedData[i].price;
    itemPrice.classList.add("card-text");

    let addToCartBtn = document.createElement("BUTTON");
    addToCartBtn.innerText = "Add to Cart";
    addToCartBtn.classList.add("add-to-cart-btn");
    addToCartBtn.id = "button_" + collectedData[i].link;

    itemBody.appendChild(itemName);
    itemBody.appendChild(itemStore);
    itemBody.appendChild(itemPrice);
    itemBody.appendChild(addToCartBtn);
    imageCol.appendChild(image);
    itemBodyCol.appendChild(itemBody);
    itemRow.appendChild(imageCol);
    itemRow.appendChild(itemBodyCol);
    item.appendChild(itemRow);
    searchResults.appendChild(item);
    document
      .getElementById("button_" + collectedData[i].link)
      .addEventListener("click", () => {
        addToCart("button_" + collectedData[i].link);
      });
  }
}

function addToCart(id) {
  console.log("added to cart", id);
  let btn = document.getElementById(id);
  let product = dummyData.find((data) => "button_" + data.link === id);
  let cartItemsContainer = document.getElementById("cartItems");

  if (btn.innerText === "Add to Cart") {
    btn.innerText = "Remove from Cart";
    let item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `<img src="${product.imgAddr}" alt="Item" style="width:50px; height:50px; vertical-align: middle;">
                      <p>${product.productName} - $${product.price}</p>`;
    cartItemsContainer.appendChild(item);
  } else {
    alert("This item is already in your cart");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  async function navigate(viewID) {
    const viewsElm = document.getElementById("views");
    viewsElm.innerHTML = "";
    let view = null;
    if (viewID === "home") {
      view = new HomeView();
    }
    // else if (viewID === "cart") {
    //   view = new CartView();
    // }
    else if (viewID === "wishlist") {
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
