chrome.runtime.sendMessage({ event: "restore_url" });

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.event == "goto_url") {
    location.href = message.url;
  } else if (message.event == "browserActionOnClicked") {
    chrome.runtime.sendMessage({ event: "save_url", url: location.href });

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
  }
});
