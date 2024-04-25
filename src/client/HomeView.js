export class HomeView {
  constructor() {}

  async render() {
    const homeViewElm = document.createElement("div");
    homeViewElm.id = "home-view";

    const homeContainerElm = document.createElement("div");
    homeContainerElm.id = "home-container";

    homeViewElm.appendChild(homeContainerElm);

    const home = new Home();
    homeContainerElm.appendChild(await home.render());

    homeViewElm.appendChild(homeContainerElm);

    return homeViewElm;
  }
}

class Home {
  constructor() {}

  async render() {
    const homeElem = document.createElement("div");
    homeElem.id = "home";
    homeElem.classList.add("view");

    const title = document.createElement("h1");
    title.innerText = "Welcome to StyleScout360";
    homeElem.appendChild(title);

    const subtitle = document.createElement("h3");
    subtitle.innerText = "Search the entire web with the click of a button!";
    subtitle.style = "color: #63606B";
    homeElem.appendChild(subtitle);

    homeElem.appendChild(this.createCarousel());

    homeElem.appendChild(this.renderRecommendedSearches());

    return homeElem;
  }

  renderRecommendedSearches() {
    const recommendations = [
      "Business Casual Pants",
      "Summer Dress",
      "Denim Jacket",
    ];

    const recommendedSearchContainer = document.createElement("div");
    recommendedSearchContainer.id = "recommended-search-container";

    const title = document.createElement("h5");
    title.innerText = "Recommended Searches";
    title.id = "recommended-searches-title";
    recommendedSearchContainer.appendChild(title);

    const imageRow = document.createElement("div");
    imageRow.classList.add("row");
    imageRow.id = "recommended-searches";
    recommendedSearchContainer.appendChild(imageRow);

    for (let i = 0; i < 3; ++i) {
      const searchImgCol = document.createElement("div");
      searchImgCol.classList.add("col");
      imageRow.appendChild(searchImgCol);

      const searchImage = document.createElement("img");
      searchImage.src = "img/recommended-img-" + i + ".jpeg";
      searchImage.classList.add("recommended-search-img");
      searchImgCol.appendChild(searchImage);

      const recommendationTitle = document.createElement("h4");
      recommendationTitle.innerText = recommendations[i];
      searchImgCol.appendChild(recommendationTitle);
    }

    return recommendedSearchContainer;
  }

  createCarousel() {
    const carouselContainer = document.createElement("div");
    carouselContainer.classList.add("carousel");
    carouselContainer.classList.add("slide");
    carouselContainer.dataset.bsRide = "carousel";
    carouselContainer.id = "carousel";

    const carouselInner = document.createElement("div");
    carouselInner.classList.add("carousel-inner");
    carouselContainer.appendChild(carouselInner);

    for (let i = 0; i < 4; ++i) {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      if (i === 0) {
        carouselItem.classList.add("active");
      }
      carouselInner.appendChild(carouselItem);

      const carouselImg = document.createElement("img");
      carouselImg.src = "img/carousel-img-" + i + ".jpeg";
      carouselImg.classList.add("d-block");
      carouselImg.classList.add("w-100");
      carouselImg.classList.add("carousel-img");
      carouselItem.appendChild(carouselImg);
    }

    return carouselContainer;
  }
}
