function initialize() {
    chrome.storage.local.get(["wcaData"], function(items) {
        console.log(items.wcaData);
        for (var i=0;i<Object.keys(items.wcaData).length;i++) {
            var meta = items.wcaData[Object.keys(items.wcaData)[i]]["meta"];

            var metaDiv = `<div class=\"meta\"><h1 class=\"name\">${items.wcaData[Object.keys(items.wcaData)[i]]["name"]}</h1><div class=\"meta-gender\">${meta["gender"]}</div><div class=\"meta-country\">${meta["country"]}</div><div class=\"meta-comps\">${meta["compCount"]}</div><div class=\"meta-solves\">${meta["solveCount"]}</div></div>`
            document.getElementById("stats").insertAdjacentHTML("beforeend",metaDiv);
        }
    })
    
}

document.addEventListener("DOMContentLoaded",initialize);