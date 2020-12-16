function scrapeData() { 
    chrome.storage.local.get(["wcaData"], function(items) {
        var ids = Object.keys(items.wcaData);
        console.log(ids);
        ids.forEach(id=>document.getElementById('wca-ids-body').innerHTML+=`<tr><td class=\"wca-name-data\">${items.wcaData[id]["name"]} </td><td class=\"wca-id-data\"> ${id}</td></tr>`);
    });
}

function clearStorage() {
    chrome.storage.local.set({wcaData:{}}, function(items) {
        console.log("Storage Cleared");
        window.close();
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});

        });
    });
}

function compareStats() {
    chrome.storage.local.get(["wcaData"], function(items) {
        if (Object.keys(items.wcaData).length < 2) {
            alert("Too few people, mininmum: 2");
        }
        else {
            open(chrome.extension.getURL("popups/statsPage/stats.html"));
        }
    })
   
}

function animateName() {
    document.getElementById("app-name").innerText="github";
}
function deanimateName() {
    document.getElementById("app-name").innerText="wcaddons";
}

document.addEventListener('DOMContentLoaded',scrapeData)
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("clear-names").src=chrome.extension.getURL("images/clear.png");
    document.getElementById("compare").src=chrome.extension.getURL("images/checkmark.png");
    document.getElementById("clear-names").onclick=clearStorage;
    document.getElementById("compare").onclick = compareStats;
    document.getElementById("app-name").onmouseover = animateName;
    document.getElementById("app-name").onmouseleave = deanimateName;

});