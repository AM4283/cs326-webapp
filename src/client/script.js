import { WishlistView } from "./WishlistView.js";
import { CartView } from "./CartView.js";
import { HomeView } from "./HomeView.js";
import { SearchResultsView } from "./searchResultsView.js";

document.addEventListener("DOMContentLoaded", () => {
  async function navigate(viewID) {
    const viewsElm = document.getElementById("views");
    viewsElm.innerHTML = "";
    let view = null;
    if (viewID === "home") {
      view = new HomeView();
    } else if (viewID === "cart") {
      view = new CartView();
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
        const view = href.replace("#", "");
        window.location.hash = view;
        navigate(view);
      });
    });
  }

  const menu = document.getElementById("menu");
  const menuLinks = menu.querySelectorAll("a");
  setLinks(menuLinks);
  const iconLinks = document
    .getElementById("nav-bar-image-links")
    .querySelectorAll("a");
  setLinks(iconLinks);
  const searchLink = document.getElementById('search-button')
  setLinks([searchLink])

  navigate("home");
});
