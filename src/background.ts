chrome.action.onClicked.addListener((tab) => {
  if (
    !tab.url.startsWith("https://twitter.com") &&
    !tab.url.startsWith("https://x.com")
  ) {
    return;
  }

  chrome.tabs.sendMessage(tab.id, {
    event: "browserActionOnClicked",
  });
});
