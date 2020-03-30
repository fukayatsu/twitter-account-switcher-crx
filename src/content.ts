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

  let accountSwitcherButton = document.querySelector(
    '[data-testid="SideNav_AccountSwitcher_Button"]'
  ) as HTMLElement;

  if (!accountSwitcherButton) {
    accountSwitcherButton = document.querySelector(
      'nav[role="navigation"] div[role="button"]'
    ) as HTMLElement;
  }

  if (!accountSwitcherButton) {
    alert("Error: AccountSwitcher Button not found.");
    return;
  }

  accountSwitcherButton.click();

  setTimeout(() => {
    let nextAccount;
    let currentAccount = document.querySelector('li[data-testid="UserCell"]') as HTMLElement;

    if (currentAccount) {
      nextAccount = currentAccount.nextSibling as HTMLElement;
      if (!nextAccount?.dataset?.testid) {
        alert("Error: Anothor account not found.");
        return;
      }
    } else {
      const nodes = document
        .querySelector("[role=menu]")
        .querySelectorAll('div[role="button"]') as NodeListOf<HTMLElement>;
      nextAccount = nodes[nodes.length - 1];
    }

    nextAccount.click();
  }, 100);
});
