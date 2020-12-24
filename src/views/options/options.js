function adjustLogo() {
    var logo = document.getElementById("header");
    
    if (document.documentElement.scrollTop>10) {
        logo.style.backgroundColor="black";
    }
    else {
        console.log("pass");
    }
}

function setThemeOptions() {
    var options = document.getElementById("options");
    var themeDiv = document.createElement("div");

    //insert new theme names here
    var lightDefault = document.createElement("h2");
    lightDefault.innerText = "SET LIGHT THEME";
    lightDefault.id = "lightDefault";
    lightDefault.onclick = ()=>setNewTheme(lightDefault.id);
    options.insertAdjacentElement("afterbegin",lightDefault);

    var darkDefault = document.createElement("h2");
    darkDefault.innerText = "SET DARK THEME";
    darkDefault.id = "darkDefault";
    darkDefault.onclick = ()=>setNewTheme(darkDefault.id);
    options.insertAdjacentElement("afterbegin", darkDefault);

    var monokai = document.createElement("h2");
    monokai.innerText = "SET MONOKAI THEME";
    monokai.id = "monokai";
    monokai.onclick = ()=>setNewTheme(monokai.id);
    options.insertAdjacentElement("afterbegin", monokai);

}

var versionNumber = chrome.runtime.getManifest().version;
document.getElementById("version").innerText+=versionNumber;
document.getElementById("logo").src=chrome.extension.getURL("images/logo.png");
//document.getElementById("theme-indicator").onclick=toggleTheme;
//document.getElementById("github").src=chrome.extension.getURL("images/github.png");
document.addEventListener("DOMContentLoaded", ()=>{
    setInitialTheme();
    setThemeOptions();
    }
);  