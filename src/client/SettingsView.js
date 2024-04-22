export class SettingsView {
  constructor() {}

  async render() {
    const settingsViewElm = document.createElement("div");
    settingsViewElm.id = "settings-view";

    const settingsContainerElm = document.createElement("div");
    settingsContainerElm.id = "settings-container";

    settingsViewElm.appendChild(settingsContainerElm);

    const settings = new Settings();
    settingsContainerElm.appendChild(await settings.render());

    settingsViewElm.appendChild(settingsContainerElm);

    return settingsViewElm;
  }
}

class Settings {
  constructor() {}

  async render() {
    const settingsElm = document.createElement("div");
    settingsElm.id = "settings";
    settingsElm.classList.add("view");

    const textElm = document.createElement("h1");
    textElm.innerText = "This is the settings page";

    settingsElm.appendChild(textElm);

    return settingsElm;
  }
}
