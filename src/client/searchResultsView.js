/**
 * Represents the view for displaying search results.
 * @class
 */
export class SearchResultsView {
  constructor() {}

  /**
   * Renders the search results view element with all its child components.
   * @async
   * @returns {Promise<HTMLDivElement>} The rendered search results view element.
   */
  async render() {
    if (DEBUG) console.log("rendering search results");
    const searchResultsViewElem = document.createElement("div");
    searchResultsViewElem.id = "searchResults-view";

    const searchResultsContainerElem = document.createElement("div");
    searchResultsContainerElem.id = "searchResults-container";

    searchResultsViewElem.appendChild(searchResultsContainerElem);

    const searchResults = new SearchResults();
    searchResultsContainerElem.appendChild(await searchResults.render());

    searchResultsViewElem.appendChild(searchResultsContainerElem);

    return searchResultsViewElem;
  }
}

/**
 * Represents the search results component within the search results view.
 * @class
 */
class SearchResults {
  constructor() {
    this.sortOrder = "Sort By";
    this.filters = [];
    this.searchResults = [];
    this.searchResultsElem = document.createElement("div");
  }

  /**
   * Renders the search results component with its content.
   * @async
   * @returns {Promise<HTMLDivElement>} The rendered search results element.
   */
  async render() {
    this.searchResultsElem.id = "searchResults";
    this.searchResultsElem.classList.add("view");

    const searchInput = document.getElementById("search-bar").value;
    this.searchResults = await this.searchWebForData(searchInput);
    this.searchResultsElem.appendChild(
      this.renderSearchResultTools(searchInput),
    );

    this.searchResultsElem.appendChild(
      await this.renderSearchResults(this.searchResults),
    );

    return this.searchResultsElem;
  }

  /**
   * Renders individual search results.
   * @param {Array<Object>} searchResults - The search results to render.
   * @returns {HTMLDivElement} The container with all search results.
   */
  async renderSearchResults(searchResults) {
    const allResults = document.createElement("div");
    allResults.id = "results";
    if (DEBUG) console.log(searchResults);

    for (let i = 0; i < searchResults.length; ++i) {
      const item = document.createElement("div");
      item.classList.add("card");
      item.classList.add("mb-3");

      let itemRow = document.createElement("div");
      itemRow.classList.add("row");
      itemRow.classList.add("g-0");

      let imageCol = document.createElement("div");
      imageCol.classList.add("col-md-4");

      let image = document.createElement("img");
      image.src = searchResults[i].imgAddr;
      image.classList.add("search-result-image");

      let itemBodyCol = document.createElement("div");
      itemBodyCol.classList.add("col-md-8");

      let itemBody = document.createElement("div");
      itemBody.classList.add("card-body");

      let itemName = document.createElement("a");
      itemName.innerText = searchResults[i].productName;
      itemName.href = searchResults[i].link;
      itemName.classList.add("card-title");
      itemName.classList.add("unstyled-link");
      itemName.classList.add("search-result-item-name");
      itemBody.appendChild(itemName);

      let itemStore = document.createElement("h6");
      itemStore.innerText = searchResults[i].store;
      itemStore.classList.add("card-subtitle");
      itemStore.classList.add("mb-2");
      itemStore.classList.add("text-body-secondary");
      itemBody.appendChild(itemStore);

      let itemPrice = document.createElement("p");
      itemPrice.innerText = "$" + searchResults[i].price;
      itemPrice.classList.add("card-text");
      itemBody.appendChild(itemPrice);

      let buttonRow = document.createElement('div')
      buttonRow.classList.add("row")
      itemBody.appendChild(buttonRow)

      let addToCartBtn = document.createElement('button')
      addToCartBtn.classList.add('btn')
      addToCartBtn.classList.add("add-to-button");
      addToCartBtn.classList.add('standard-button')
      addToCartBtn.id = "cart_button_" + searchResults[i].link;
      buttonRow.appendChild(addToCartBtn)

      let quantitySelector = document.createElement("select");
      quantitySelector.name = "sort";
      quantitySelector.innerText = "1";
      quantitySelector.id = "quantity_" + searchResults[i].link;
      quantitySelector.hidden = true
      itemBody.appendChild(quantitySelector);
  
      const optionList = ["1", "2", "3", '4', '5', '6', '7', '8', '9', '10'];
      for (let i = 0; i < optionList.length; i++) {
        const option = document.createElement("option");
        option.value = optionList[i];
        option.innerText = optionList[i];
        quantitySelector.appendChild(option);
      }
      quantitySelector.addEventListener("change", async () => {
        if (DEBUG) console.log('updating quantity for this item')
        await this.updateQuantity(searchResults[i].link, quantitySelector.value)
      });
      if(this.isInCart(searchResults[i])) {
          addToCartBtn.innerText = "Remove from Cart";
          quantitySelector.hidden = false
          
          quantitySelector.value= await this.getQuantity(searchResults[i].link);


      } else {
          addToCartBtn.innerText = "Add to Cart";
      }
      addToCartBtn.addEventListener("click", async () => {
          await this.addToCart(searchResults[i]);
        });

      imageCol.appendChild(image);
      itemBodyCol.appendChild(itemBody);
      itemRow.appendChild(imageCol);
      itemRow.appendChild(itemBodyCol);
      item.appendChild(itemRow);
      allResults.appendChild(item);
    }
    return allResults;
  }

  /**
   * Re-renders the search results based on the current sort order and filters.
   */
  async reRender() {
    if (DEBUG) {
      console.log("re-rendering in process");
      console.log("sort order: " + this.sortOrder);
      console.log("filters: " + this.filters);
    }

    let reSortedResults = [...this.searchResults];
    if (this.sortOrder === "Price Low to High") {
      reSortedResults = reSortedResults.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === "Price High to Low") {
      reSortedResults = reSortedResults.sort((a, b) => b.price - a.price);
    }

    this.searchResultsElem.removeChild(document.getElementById("results"));
    this.searchResultsElem.appendChild(
      await this.renderSearchResults(reSortedResults),
    );
  }

  /**
   * Adds an item to the cart and updates the button text.
   * @param {Object} itemInfo - The information about the item to add to the cart.
   */
  async addToCart(itemInfo){
    const user = localStorage.getItem("currentUser");
    if (DEBUG) console.log(user);
    if(!user) {
        alert("Please sign in to add items to cart!");
        return;
    }
    const id = user + '_cart_' + itemInfo.link.substring(itemInfo.link.length-15);
    let btn = document.getElementById('cart_button_' + itemInfo.link);
    const product = itemInfo.productName;
    const img = itemInfo.imgAddr;
    const price = itemInfo.price;
    const quantity = 1;
    const store = itemInfo.store;
    const link = itemInfo.link;
    if(btn.innerText === 'Add to Cart'){
      try{
        const response = await fetch('/api/add_to_cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id, product, user, img, price, store, link, quantity }) 
        });
        localStorage.setItem(id, itemInfo.productName);
        btn.innerText = "Remove from Cart";
        document.getElementById("quantity_" + itemInfo.link).hidden = false
        if (DEBUG) console.log('local storage: added to cart');
      } catch (e) {
        console.error(`error in addToCart`);
        console.error(e);
      }
    } else {
        try {
          const response = await fetch(`/api/delete_item?id=${id}`, { method: "DELETE" });
          if (DEBUG) console.log("received delete response");
          if(response.status == 200) {
            localStorage.removeItem(id);
            btn.innerText = "Add to Cart";
            document.getElementById("quantity_" + itemInfo.link).hidden = true
            if (DEBUG) console.log('local storage: removed from cart');
          } else {
            alert("Error removing this item from cart");
          }
        } catch (error) {
            alert("There was an error removing this item from your cart.")
            console.error(error);
        }
    }
  }
  
  isInCart(itemInfo) {
    const user = localStorage.getItem("currentUser");
    if(!user) { return false; }
    if(localStorage.getItem(user + '_cart_' + itemInfo.link.substring(itemInfo.link.length-15))) {
      return true;
    }
    return false;
  }

  async updateQuantity(link, quantity) {
    const user = localStorage.getItem("currentUser");
    if(!user) {
      alert("Sign in to add items to cart");
      return;
    }
    const id = user + "_cart_" + link.substring(link.length-15);
    try {
      const response = await fetch(`/api/update_quantity?id=${id}&quantity=${quantity}`, { method: "PUT" });
      if(response.status == 200 && DEBUG) {
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

  async getQuantity(link) {
    const user = localStorage.getItem("currentUser");
    if(!user) {
      return 0;
    }
    const id = user + '_cart_' + link.substring(link.length-15)
    const response = await fetch(`/api/get_quantity?id=${id}`, { method: "GET" });
    const quantity = (await response.json()).quantity;
    if (DEBUG) console.log(quantity);
    return quantity;
  }

  /**
   * Renders tools for search results like sorting options.
   * @param {string} searchInput - The current search input.
   * @returns {HTMLDivElement} The search result tools element.
   */
  renderSearchResultTools(searchInput) {
    if (DEBUG) console.log("rendering the tool bar");

    const tools = document.createElement("div");
    tools.classList.add("row");
    tools.id = "search-results-tools";

    const resultInfo = document.createElement("p");
    resultInfo.classList.add("col");
    resultInfo.id = "search-results-info";
    resultInfo.innerText =
      'Search Results for "' +
      searchInput +
      '". ' +
      this.searchResults.length +
      " results found.";
    tools.appendChild(resultInfo);

    const selectCol = document.createElement("div");
    selectCol.classList.add("col");
    tools.appendChild(selectCol);

    const sortOptions = document.createElement("select");
    sortOptions.name = "sort";
    sortOptions.innerText = "Sort By";
    sortOptions.id = "sort-options";
    selectCol.appendChild(sortOptions);

    const defaultOption = document.createElement("option");
    defaultOption.value = "none";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    defaultOption.hidden = true;
    defaultOption.innerText = "Sort By";
    sortOptions.appendChild(defaultOption);

    const optionList = ["Featured", "Price Low to High", "Price High to Low"];
    for (let i = 0; i < optionList.length; i++) {
      const option = document.createElement("option");
      option.value = optionList[i];
      option.innerText = optionList[i];
      sortOptions.appendChild(option);
    }
    sortOptions.addEventListener("change", () => {
      this.sortOrder = sortOptions.value;
      this.reRender();
    });

    return tools;
  }

  /**
   * Simulates a web search for data based on the input.
   * @param {string} searchInput - The search query.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of search result data.
   */
  async searchWebForData(searchInput) {
    //this function will eventually return data using a web scraper
    if (DEBUG) console.log("searching the web for results related to " + searchInput);
    const dummyData = [
      {
        imgAddr:
          "https://m.media-amazon.com/images/I/51ulmT3YUZL._AC_UY1000_.jpg",
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
    return dummyData;
  }
}
