function setNewTheme(name) {
    chrome.storage.local.set({"themePref":name}, function(items) {
        console.log("New theme, "+name+" set!");
        setInitialTheme();
    })
}

function setInitialTheme() {
    chrome.storage.local.get(["themePref"], function(items) {
        console.log("Theme init!");
        var theme = items.themePref;
        var themeLink = document.getElementById("theme");
        themeLink.href = chrome.extension.getURL(`views/themes/${theme}.css`); 
    })
}

function storageReloaded(changes,area) {
    console.log("Hello");
    if (area=="local" && Object.keys(changes).indexOf("themePref")!=-1) {
        setInitialTheme();
        console.log("Changed");
    }
}

chrome.storage.onChanged.addListener(storageReloaded);