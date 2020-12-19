var url,additionURL,subtractionURL
function setGlobals() {
    url = window.location.href;
    additionURL = chrome.extension.getURL("images/add.png");
    subtractionURL = chrome.extension.getURL("images/remove.png");
}
//Maybe add scrapeName function so that the popup has the name as well as teh id, but i dont think thats really necessary
function scrapeID() {
    var wcaID = url.slice(url.lastIndexOf("/")+1);
    return wcaID;
}

function clearStorage() {
    chrome.storage.local.set({"wcaData":[]},function(items) {});
}

function setSymbol() {
    chrome.storage.local.get(["wcaData"], function(items) {
        var ids = items.wcaData;
        if (ids==[]) {
            console.log("empty");
            document.getElementById("--extension-button-add").src=additionURL;
        }
        else {
            console.log("not empty");
            if (ids.indexOf(scrapeID())==-1) {
                console.log("Shitter is in here");
                document.getElementById("--extension-button-add").src=additionURL;
            }
            else {
                console.log("Shitter is NOT here");
                document.getElementById("--extension-button-add").src=subtractionURL;
            }
        }
    })
}

function addName() {
    var wcaID = scrapeID()
    var currentIDS; 
    console.log("Getting old data...");
    
    chrome.storage.local.get(["wcaData"], function(items) {
        currentIDS = items.wcaData;
        console.log(currentIDS);
        if (currentIDS.indexOf(wcaID)!=-1) {
            var index = currentIDS.indexOf(wcaID);
            currentIDS.splice(index,1);
            console.log(currentIDS);
            console.log("Removing entry");
            document.getElementById("--extension-button-add").src=additionURL;
        }
        else {
            currentIDS.push(scrapeID());
            console.log("Adding entry");
            document.getElementById("--extension-button-add").src=subtractionURL;
        };
        chrome.storage.local.set({"wcaData":currentIDS});
    });
   
}

function setAddButtons() {
    if (url.match(/https:\/\/www.worldcubeassociation.org\/persons\/\d{4}\w{4}\d{2}/)) {
        var genHTML = document.getElementsByClassName("avatar")[0];
        //maybe change this to using "insertAdjacentElement" or something like that so that its more clear what is being done (rather than weird strings)
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