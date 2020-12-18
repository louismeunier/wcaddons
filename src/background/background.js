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
        newPref = "light";
      }
      chrome.storage.local.set({"themePref":newPref},function(items) {
        console.log("Set theme!");
      })
    })
    open(chrome.extension.getURL("popups/other/installed/installed.html"));
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'www.worldcubeassociation.org'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });