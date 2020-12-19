function adjustLogo() {
    var logo = document.getElementById("header");
    
    if (document.documentElement.scrollTop>10) {
        logo.style.backgroundColor="black";
    }
    else {
        console.log("pass");
    }
}

function setTheme() {
    chrome.storage.local.get(["themePref"], function(items) {
        var theme = items.themePref;
        if (theme=="light") {
            document.getElementById("theme-indicator").src = chrome.extension.getURL("images/sun.png");
            
            document.getElementsByTagName("body")[0].className="theme-light";
        }
        else if (theme=="dark") {
            document.getElementById("theme-indicator").src = chrome.extension.getURL("images/moon.png");
 
            document.getElementsByTagName("body")[0].className="theme-dark";
        }
    })
}

function toggleTheme() {
    chrome.storage.local.get(["themePref"], function(items) {
        var theme = items.themePref;

        if (theme=="light") {
            theme = "dark";
        }
        else if (theme=="dark") {
            theme = "light";
        }
        chrome.storage.local.set({"themePref":theme},function(items) {
            console.log("Theme set.");
            setTheme();
        })
    })
}
var versionNumber = chrome.runtime.getManifest().version;
document.getElementById("version").innerText+=versionNumber;
document.getElementById("logo").src=chrome.extension.getURL("images/logo.png");
document.getElementById("theme-indicator").onclick=toggleTheme;
//document.getElementById("github").src=chrome.extension.getURL("images/github.png");
document.addEventListener("DOMContentLoaded", setTheme);