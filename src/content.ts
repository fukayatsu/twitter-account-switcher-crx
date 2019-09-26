const key = "tas_return_to_url";

if (localStorage[key]) {
  const url = localStorage[key];
  delete localStorage[key];
  location.href = url;
}

chrome.runtime.onMessage.addListener(message => {
  if (message.event != "browserActionOnClicked") {
    return;
  }

  localStorage[key] = location.href;

  const moreButton = document.querySelector(
    'nav[role="navigation"] div[role="button"]'
  ) as HTMLElement;

  if (!moreButton) {
    alert("Error: Button not found.");
    return;
  }

  moreButton.click();

  setTimeout(() => {
    const nodes = document
      .querySelector("[role=menu]")
      .querySelectorAll('div[role="button"]') as NodeListOf<HTMLElement>;

    if (nodes.length === 0) {
      alert("Error: Anothor account not found.");
      return;
    }
    nodes[nodes.length - 1].click();
  }, 500);
});
