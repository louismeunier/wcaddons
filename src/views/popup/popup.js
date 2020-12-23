function scrapeData() { 
    chrome.storage.local.get(["wcaData"], function(items) {
        var ids = items.wcaData;
        console.log(ids);
        ids.forEach(id=>document.getElementById('wca-ids-body').innerHTML+=`<tr><td class=\"wca-id-data\"> ${id}</td></tr>`);
    });
}

function clearStorage() {
    chrome.storage.local.set({wcaData:[]}, function(items) {
        console.log("Storage Cleared");
        window.close();
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});

        });
    });
}

function compareStats() {
    chrome.storage.local.get(["wcaData"], function(items) {
        if (items.wcaData.length < 2) {
            alert("Too few people, mininmum: 2");
        }
        else {
            open(chrome.extension.getURL("views/react-test/index.html"));
        }
    })
   
}

function animateName() {
    document.getElementById("app-name").innerText="github";
}

function deanimateName() {
    document.getElementById("app-name").innerText="wcaddons";
}

function setTheme() {
    chrome.storage.local.get(["themePref"], function(items) {
        var theme = items.themePref;
        if (theme=="light") {
            document.getElementById("toggle-theme").src = chrome.extension.getURL("images/sun.png");
            document.getElementById("footer").className="theme-light";
            document.getElementsByTagName("body")[0].className="theme-light";
        }
        else if (theme=="dark") {
            document.getElementById("toggle-theme").src = chrome.extension.getURL("images/moon.png");
            document.getElementById("footer").className="theme-dark"
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

document.addEventListener('DOMContentLoaded',scrapeData)
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("clear-names").src=chrome.extension.getURL("images/clear.png");
    document.getElementById("compare").src=chrome.extension.getURL("images/enter.png");
    document.getElementById("clear-names").onclick=clearStorage;
    document.getElementById("compare").onclick = compareStats;
    document.getElementById("app-name").onmouseover = animateName;
    document.getElementById("app-name").onmouseleave = deanimateName;
    document.getElementById("toggle-theme").onclick = toggleTheme;
    setTheme();
});
