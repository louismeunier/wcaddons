function themeBase(theme) {
    var themeElement = document.createElement("div");

    var themeName = document.createElement("h2");
    themeName.innerText = theme.toUpperCase();

    themeElement.id = theme;

    themeElement.className = "theme-selector";

    themeElement.insertAdjacentElement("afterbegin",themeName);
    themeElement.onclick = ()=>setNewTheme(themeElement.id);
    return themeElement;
}
function setThemeOptions() {
    var themeDiv = document.getElementById("themes");

    themeDiv.id="themes";
    let themes = ["lightDefault","darkDefault","monokai","terminal","cstimer","olivia"];
    for (var i=0;i<themes.length;i++) {
        themeDiv.insertAdjacentElement("afterbegin",themeBase(themes[i]));
    }
}
function setWCAInputOption() {
    var newID;
    var input = document.querySelector("#wca-option-input > form > input[type=text]:nth-child(1)");
    var form = document.querySelector("#wca-option-input > form");
    chrome.storage.local.get("personalID", items => {
        if (items.personalID!="") {
            input.placeholder = items.personalID;
        }
        else {
            input.placeholder = "Enter Your WCA ID";
        }
    })
    //Add regex checking for wcaID
    input.addEventListener("input",event=>{
        newID = input.value;
    })
    
    form.addEventListener("submit", event=> {
    if (!newID.match(/\d{4}\w{4}\d{2}/)) {alert("Invalid ID"); return;};
      chrome.storage.local.set({"personalID":newID},function(items) {
          console.log("New ID set");
      }) 
  
    })

}
var versionNumber = chrome.runtime.getManifest().version;
document.getElementById("version").innerText+=versionNumber;
document.getElementById("logo").src=chrome.extension.getURL("images/logo.png");
document.addEventListener("DOMContentLoaded", ()=>{
    setInitialTheme();
    setThemeOptions();
    setWCAInputOption();
    }
);  