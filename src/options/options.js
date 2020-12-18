function setNewTheme() {
    
}

function setInitialTheme() {
    chrome.storage.local.get(["themePref"], function(items) {
        var theme = items.themePref;
        if (theme=="light") {
            document.getElementById("light-select").checked = true;
            document.getElementById("dark-select").checked = false;
        }
        else if (theme=="dark") {
            document.getElementById("dark-select").checked = true;
            document.getElementById("light-select").checked = false;

        }
    })
}
document.addEventListener("DOMContentLoaded", setInitialTheme);