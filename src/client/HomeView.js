export class HomeView {
    constructor() {}

    async render() {
        const homeViewElm = document.createElement('div');
        homeViewElm.id = 'home-view';

        const homeContainerElm = document.createElement('div');
        homeContainerElm.id = 'home-container';

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
        const homeElm = document.createElement('div');
        homeElm.id = 'home';
        homeElm.classList.add('view');

        const textElm = document.createElement('h1');
        textElm.innerText = 'Welcome to StyleScout360';

        homeElm.appendChild(textElm);

        return homeElm;
    }
}