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
    let currentAccount = document.querySelector(
      'li[data-testid="UserCell"]'
    ) as HTMLElement;

    let nextAccountGroup;
    let nextAccount;

    if (currentAccount) {
      nextAccountGroup = currentAccount.nextSibling as HTMLElement;
      if (!nextAccountGroup) {
        alert("Error(1): Anothor account not found.");
        return;
      }
      nextAccount = nextAccountGroup.querySelectorAll(
        "[data-testid='UserCell']"
      )[0] as HTMLElement;
      if (!nextAccount) {
        alert("Error(2): Anothor account not found.");
        return;
      }
    }

    nextAccount.click();
  }, 100);
});
