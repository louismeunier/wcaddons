function removeName(clicked) {
    var idToRemove = this.id;
    chrome.storage.local.get(["wcaData"],function(items) {
        var current = items.wcaData;
        current.splice(current.indexOf(idToRemove,1));
        console.log(current);
        chrome.storage.local.set({"wcaData":current},function(items) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
            });
            window.close();
        })
    })
}
function scrapeData() { 
    chrome.storage.local.get(["wcaData"], function(items) {
        var ids = items.wcaData;
        var text;
        var idsBody = document.getElementById("wca-ids-body");
        for (var i=0;i<ids.length;i++) {
            var row = document.createElement("tr");
            var data = document.createElement("td");
            text = ids[i];
            data.innerText = text;
            data.className = "wca-id-data";
            data.id = text;
            data.onclick=removeName;
            row.appendChild(data);
            idsBody.appendChild(row);
        }
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

document.addEventListener('DOMContentLoaded',scrapeData)
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("clear-names").src=chrome.extension.getURL("images/clear.png");
    document.getElementById("compare").src=chrome.extension.getURL("images/enter.png");
    document.getElementById("clear-names").onclick=clearStorage;
    document.getElementById("compare").onclick = compareStats;
    document.getElementById("app-name").onmouseover = animateName;
    document.getElementById("app-name").onmouseleave = deanimateName;
    setInitialTheme();
});
