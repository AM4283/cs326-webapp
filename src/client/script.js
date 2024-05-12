import { CartView } from "./CartView.js";
import { HomeView } from "./HomeView.js";
import { SearchResultsView } from "./searchResultsView.js";

document.addEventListener("DOMContentLoaded", () => {
  /**
   * Updates the webpage view to the specified viewID
   * @async
   * @function navigate
   * @param {Number} viewID ID corresponding to different application view
   */
  async function navigate(viewID) {
    const viewsElm = document.getElementById("views");
    viewsElm.innerHTML = "";
    let view = null;
    if (viewID === "home") {
      view = new HomeView();
    } else if (viewID === "cart") {
      view = new CartView();
    } else if (viewID === "searchResults") {
      view = new SearchResultsView();
    }
    viewsElm.appendChild(await view.render());
  }
  /**
   * Replaces the # in href elements of html objects to "" and updates them to make them update our view to the specified viewID
   * @function setLinks
   * @param {HTMLElement} links HTML object that contains href elements
   */
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
  const cartButton = document.getElementById("cartButton");
  cartButton.addEventListener("click", () => navigate("cart"));
  setLinks([searchLink]);

  navigate("home");
});
