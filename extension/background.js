"use strict";

const searchString = ["google", "amazon", "microsoft", "cisco"]; // String to look for in URL

function openEyes(tab) {
  searchString.forEach(site => {
    if (tab.url.toLowerCase().includes(site)) {
      chrome.pageAction.setIcon({
        tabId: tab.id,
        path: {
          "16": "images/eyes16.png",
          "32": "images/eyes32.png",
          "48": "images/eyes48.png",
          "128": "images/eyes128.png"
        }
      });
      if (tab.url.toLowerCase().includes(site)) {
        chrome.storage.sync.set({ webSite: site }, function() {
          // console.log("website ToS set in popup");
        });
      }
    }
  });
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    openEyes(tab);
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  openEyes(tab);
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    searchString.forEach(site => {
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { urlContains: site }
            })
          ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
        }
      ]);
    });
  });
});
