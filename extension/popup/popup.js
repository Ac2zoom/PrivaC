// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

var sites = ["google", "amazon", "microsoft", "cisco"];
var tos = {
  google: "https://policies.google.com/terms?hl=en",
  amazon:
    "https://www.amazon.com/gp/help/customer/display.html/ref=hp_596184_terms?nodeId=14309551",
  microsoft: "https://www.microsoft.com/en-us/servicesagreement",
  cisco: "https://www.cisco.com/c/en/us/about/legal/terms-conditions.html"
};

let link = document.querySelector("a");
chrome.storage.sync.get("webSite", function(data) {
  link.setAttribute("href", tos[data.webSite]);
  link.innerHTML = data.webSite;
});
link.addEventListener("click", function() {
  chrome.tabs.create({ url: link.getAttribute("href") });
});
