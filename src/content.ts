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

  const accountSwitcherButton = document.querySelector(
    '[data-testid="SideNav_AccountSwitcher_Button"]'
  ) as HTMLElement;

  if (!accountSwitcherButton) {
    alert("Error: AccountSwitcher Button not found.");
    return;
  }

  accountSwitcherButton.click();

  setTimeout(() => {
    const currentAccount = document.querySelector('li[data-testid="UserCell"]') as HTMLElement;
    const nextAccount = currentAccount.nextSibling as HTMLElement;

    if (!nextAccount.dataset.testid) {
      alert("Error: Anothor account not found.");
      return;
    }
    nextAccount.click();
  }, 100);
});
