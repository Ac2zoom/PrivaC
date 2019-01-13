"use strict";

chrome.tabs.onActivated.addListener(function(activeInfo) {
  // console.log('updated', id, changeInfo, tab);
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    if (tab.url.includes("term")) {
      chrome.pageAction.setIcon({
        tabId: tab.id,
        path: {
          "16": "images/eyes16.png",
          "32": "images/eyes32.png",
          "48": "images/eyes48.png",
          "128": "images/eyes128.png"
        }
      });
    }
  });
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: "#3aa757" }, function() {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { pathContains: "terms" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
