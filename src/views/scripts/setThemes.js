function setNewTheme(name) {
    chrome.storage.local.set({"themePref":name}, function(items) {
        console.log("New theme, "+name+" set!");
        setInitialTheme();
    })
}

function setInitialTheme() {
    chrome.storage.local.get(["themePref"], function(items) {
        var theme = items.themePref;
        var themeLink = document.getElementById("theme");
        themeLink.href = chrome.extension.getURL(`views/themes/${theme}.css`); 
    })
}

function storageReloaded(changes,area) {
    if (area=="local" && Object.keys(changes).indexOf("themePref")!=-1) {
        setInitialTheme();
    }
}

chrome.storage.onChanged.addListener(storageReloaded);