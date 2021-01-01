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
    chrome.storage.local.get(["personalID"],function(items) {
      var newID;  
      if (items.personalID!="" && items.personalID!=undefined) {
          newID = items.personalID;
      }
      else {
        newID = "";
      }
      chrome.storage.local.set({ "personalID": newID }, function(items) {
        console.log("ID set");
      })
    })
    open(chrome.extension.getURL("views/options/options.html"));
  });
//Listener for api requests from cstimer

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.contentScriptQuery == "WCAID") {
        var url = "https://www.worldcubeassociation.org/api/v0/persons/"+request.WCAID;
        fetch(url)
            .then(response => response.text())
            .then(res => sendResponse(res))
            .catch(error => console.error(error));
        return true;  // Will respond asynchronously.
      }
    });