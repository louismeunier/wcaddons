chrome.runtime.onInstalled.addListener(function() {
  //set local storage init here
    chrome.storage.local.set({"wcaData":[]},function(items) {
      console.log(items);
      console.log("Initialized wcaData");
    })
    chrome.storage.local.get(["themePref"],function(items) {
      var newPref;
      if (items.themePref) {
        newPref = items.themePref;
      }
      else {
        newPref = "lightDefault";
      }
      chrome.storage.local.set({"themePref":newPref},function(items) {
        console.log("Set theme!");
      })
    })
    open(chrome.extension.getURL("views/options/options.html"));
  });