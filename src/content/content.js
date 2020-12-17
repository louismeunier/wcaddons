var url,additionURL,subtractionURL
function setGlobals() {
    url = window.location.href;
    additionURL = chrome.extension.getURL("images/addition1.png");
    subtractionURL = chrome.extension.getURL("images/clear.png");
}

function logCurrentNames() {
    chrome.storage.local.get(["wcaIDS"],function(items) {
        return items.wcaIDS;
    }) 
};

function scrapeMeta() {
    var countryRaw = document.querySelector("#person > div:nth-child(1) > div.details > div.bootstrap-table > div.fixed-table-container > div.fixed-table-body > table > tbody > tr > td:nth-child(1)").innerHTML;
    var country = countryRaw.slice(countryRaw.lastIndexOf(">")+2);
    var gender = document.querySelector("#person > div:nth-child(1) > div.details > div.bootstrap-table > div.fixed-table-container > div.fixed-table-body > table > tbody > tr > td:nth-child(3)").innerText;
    var compCount = document.querySelector("#person > div:nth-child(1) > div.details > div.bootstrap-table > div.fixed-table-container > div.fixed-table-body > table > tbody > tr > td:nth-child(4)").innerText;
    var solveCount = document.querySelector("#person > div:nth-child(1) > div.details > div.bootstrap-table > div.fixed-table-container > div.fixed-table-body > table > tbody > tr > td:nth-child(5)").innerText;
    var name = document.getElementsByTagName("title")[0].innerText;
    var formattedName = name.slice(0,name.lastIndexOf("|"));
    var avatar;
    if (document.querySelector("#person > div:nth-child(1) > div.text-center > img.avatar")) {
        avatar = document.querySelector("#person > div:nth-child(1) > div.text-center > img.avatar").getAttribute("src");
    }
    else {
        avatar = chrome.extension.getURL("images/noavatar.png");
    }
    return {"id":scrapeName(),"name":formattedName,"avatar":avatar,"country":country,"gender":gender,"compCount":parseInt(compCount),"solveCount":parseInt(solveCount)};
}
/*
Will do soon, will take awhile...
function scrapeBests() {

}
*/
function scrapeName() {
    var wcaID = url.slice(url.lastIndexOf("/")+1);
    return wcaID;
}

function clearStorage() {
    chrome.storage.local.set({"wcaData":[]},function(items) {});
}

function setSymbol() {
    chrome.storage.local.get(["wcaData"], function(items) {
        var ids = Object.keys(items.wcaData);
        if (ids==[]) {
            document.getElementById("--extension-button-add").src=additionURL;
        }
        else {
            if (ids.indexOf(scrapeName())==-1) {
                document.getElementById("--extension-button-add").src=additionURL;
            }
            else {
                document.getElementById("--extension-button-add").src=subtractionURL;
            }
        }
    })
}

function addName() {
    var wcaID = scrapeName()
    var currentIDS; 
    console.log("Getting old data...");
    
    chrome.storage.local.get(["wcaData"], function(items) {
        currentIDS = items.wcaData;
        if (wcaID in currentIDS) {
            delete currentIDS[wcaID];
            console.log("Removing entry");
            document.getElementById("--extension-button-add").src=additionURL;
        }
        else {
            var allTables = document.getElementsByClassName("table table-striped");
            var meta = scrapeMeta();
            var pbs = allTables[1].innerHTML;

            currentIDS[wcaID]={"meta":meta,"pbs":pbs};
            console.log("Adding entry");
            document.getElementById("--extension-button-add").src=subtractionURL;
        };
        chrome.storage.local.set({"wcaData":currentIDS});
        
    });
   
}

function setAddButtons() {
    if (url.match(/https:\/\/www.worldcubeassociation.org\/persons\/\d{4}\w{4}\d{2}/)) {

        var genHTML = document.getElementsByClassName("avatar")[0];
        if (genHTML) {
            var parent = genHTML.parentElement;
            parent.innerHTML+="<img id=\"--extension-button-add\">";
            setSymbol();
            document.getElementById("--extension-button-add").onclick=addName;
        } else {
            document.getElementsByClassName("text-center")[0].innerHTML+="<img id=\"--extension-button-add\">";
            setSymbol();
            document.getElementById("--extension-button-add").onclick=addName;
        }
    }
}

document.addEventListener("DOMContentLoaded",setGlobals());
document.addEventListener("DOMContentLoaded",setAddButtons());