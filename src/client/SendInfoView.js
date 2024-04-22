export class SendInfoView {
  constructor() {}

  async render() {
    const sendInfoViewElm = document.createElement("div");
    sendInfoViewElm.id = "sendInfo-view";
    //sendInfoViewElm.className = 'view';

    // const titleElm = document.createElement('h1');
    // titleElm.innerText = 'SendInfo';

    const sendInfoContainerElm = document.createElement("div");
    sendInfoContainerElm.id = "sendInfo-container";

    //sendInfoViewElm.appendChild(titleElm);
    sendInfoViewElm.appendChild(sendInfoContainerElm);

    const sendInfo = new SendInfo();
    sendInfoContainerElm.appendChild(await sendInfo.render());

    sendInfoViewElm.appendChild(sendInfoContainerElm);

    return sendInfoViewElm;
  }
}

class SendInfo {
  constructor() {}

  async render() {
    const sendInfoElm = document.createElement("div");
    sendInfoElm.id = "sendInfo";
    sendInfoElm.classList.add("view");

    const textElm = document.createElement("h1");
    textElm.innerText = "This is the send info page";

    sendInfoElm.appendChild(textElm);

    return sendInfoElm;
  }
}
