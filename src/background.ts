chrome.browserAction.onClicked.addListener(tab => {
  if (!tab.url.startsWith("https://twitter.com")) {
    return;
  }

  chrome.tabs.sendMessage(tab.id, {
    event: "browserActionOnClicked"
  });
});
