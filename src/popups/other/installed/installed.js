var versionNumber = chrome.runtime.getManifest().version;
document.getElementById("version").innerText+=versionNumber;
document.getElementById("logo").src=chrome.extension.getURL("images/logo.png");
document.getElementById("github").src=chrome.extension.getURL("images/github.png");
/* 
setTimeout(()=>{
    var url = window.location.href;
    if (url=="chrome-extension://maeoilcfkejjcogekbaehokkfodhpefi/popups/other/installed/installed.html") {
        chrome.tabs.query({ active: true }, function(tabs) {
            chrome.tabs.remove(tabs[0].id);
        });
    }
} , 5000);
*/