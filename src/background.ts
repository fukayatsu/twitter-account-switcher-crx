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

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.event == "save_url") {
    chrome.storage.session.set({ url: message.url });
  } else if (message.event == "restore_url") {
    chrome.storage.session.get("url", (data) => {
      if (data.url) {
        chrome.tabs.sendMessage(sender.tab.id, {
          event: "goto_url",
          url: data.url,
        });
        chrome.storage.session.remove("url");
      }
    });
  }
});
