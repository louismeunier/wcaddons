function setTheme() {
    chrome.storage.local.get(["themePref"], function(items) {
        var theme = items.themePref;
        if (theme=="light") {
            document.getElementsByTagName("body")[0].className="theme-light";
        }
        else if (theme=="dark") {
            document.getElementsByTagName("body")[0].className="theme-dark";
        }
    })
}
var versionNumber = chrome.runtime.getManifest().version;
document.getElementById("version").innerText+=versionNumber;
document.getElementById("logo").src=chrome.extension.getURL("images/logo.png");
document.getElementById("github").src=chrome.extension.getURL("images/github.png");
document.addEventListener("DOMContentLoaded",setTheme);