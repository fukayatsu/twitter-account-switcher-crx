const key = "tas_return_to_url";

if (localStorage[key]) {
  const url = localStorage[key];
  delete localStorage[key];
  location.href = url;
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.event != "browserActionOnClicked") {
    return;
  }

  localStorage[key] = location.href;

  let accountSwitcherButton = document.querySelector(
    '[data-testid="SideNav_AccountSwitcher_Button"]',
  ) as HTMLElement;

  if (!accountSwitcherButton) {
    accountSwitcherButton = document.querySelector(
      'nav[role="navigation"] div[role="button"]',
    ) as HTMLElement;
  }

  if (!accountSwitcherButton) {
    alert("Error: AccountSwitcher Button not found.");
    return;
  }

  if (!document.querySelector("[data-testid='HoverCard']")) {
    accountSwitcherButton.click();
  }

  setTimeout(() => {
    let currentAccount = document.querySelector(
      "[data-testid='HoverCard'] li[data-testid='UserCell']",
    ) as HTMLElement;

    let nextAccount;

    if (currentAccount) {
      nextAccount = currentAccount.nextSibling as HTMLElement;
      if (!nextAccount) {
        alert("Error(1): Anothor account not found.");
        return;
      }
    }
    nextAccount.click();
  }, 500);
});
