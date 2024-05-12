/**
 * This script handles the navigation and interaction logic for the application.
 */

import { CartView } from "./CartView.js";
import { HomeView } from "./HomeView.js";
import { SearchResultsView } from "./searchResultsView.js";

/**
 * Event listener for DOMContentLoaded to initialize the application.
 */
document.addEventListener("DOMContentLoaded", () => {

  /**
   * Navigates to a specified view.
   * @async
   * @param {string} viewID - The identifier for the view to navigate to.
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
   * Attaches click event listeners to navigation links.
   * @param {NodeListOf<Element>} links - The navigation links to attach listeners to.
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

  // Initialize navigation elements
  const menu = document.getElementById("menu");
  const menuLinks = menu.querySelectorAll("a");
  setLinks(menuLinks);

  const searchLink = document.getElementById("search-button");
  const cartButton = document.getElementById("cartButton");

  /**
   * Event listener for the cart button to navigate to the cart view.
   */
  cartButton.addEventListener("click", () => navigate("cart"));

  setLinks([searchLink]);

  // Navigate to the home view initially
  navigate("home");
});