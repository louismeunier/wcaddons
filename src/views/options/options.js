function adjustLogo() {
    var logo = document.getElementById("header");
    
    if (document.documentElement.scrollTop>10) {
        logo.style.backgroundColor="black";
    }
    else {
        console.log("pass");
    }
}
function themeBase(theme) {
    var themeElement = document.createElement("h2");
    themeElement.innerText = theme.toUpperCase();
    themeElement.id = theme;
    themeElement.className = "theme-selector";
    themeElement.onclick = ()=>setNewTheme(themeElement.id);
    return themeElement;
    
}
function setThemeOptions() {
    var options = document.getElementById("options");
    var themeDiv = document.createElement("div");

    let themes = ["lightDefault","darkDefault","monokai","terminal","cstimerDefault"];
    for (var i=0;i<themes.length;i++) {
        options.insertAdjacentElement("afterbegin",themeBase(themes[i]));
    }
}

var versionNumber = chrome.runtime.getManifest().version;
document.getElementById("version").innerText+=versionNumber;
document.getElementById("logo").src=chrome.extension.getURL("images/logo.png");
document.addEventListener("DOMContentLoaded", ()=>{
    setInitialTheme();
    setThemeOptions();
    }
);  