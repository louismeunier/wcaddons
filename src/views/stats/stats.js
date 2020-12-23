var baseURL = "https://www.worldcubeassociation.org/api/v0";

function baseElement(type,className=null,content=null) {
    var newElement = document.createElement(type);
    if (content) {
        newElement.setAttribute("class",className);
    }
    if (className) {
        newElement.innerText = content;
    }
    return newElement;
}

function createMeta(info) {
    var metaDiv = baseElement("div","meta");
    var avatar = baseElement("img","avatar");

    avatar.src = info.avatar.url;
    avatar.style.height = "120px";

    var id = baseElement("h2","wca-id",info.wca_id);
    var name = baseElement("h1","name",info.name);
    var country = baseElement("h2","country",info.country_iso2);
    var gender = baseElement("h2","gender",info.gender);

    metaDiv.insertAdjacentElement("afterbegin",gender);
    metaDiv.insertAdjacentElement("afterbegin",country);
    metaDiv.insertAdjacentElement("afterbegin",id);
    metaDiv.insertAdjacentElement("afterbegin",name);
    metaDiv.insertAdjacentElement("afterbegin",avatar);
    return metaDiv;
}

function createPBs(prs) {
    var prDiv = baseElement("div","pr");
    var prTable = baseElement("table","prtable");
    prTable.insertAdjacentElement("afterbegin",baseElement("th"));
    for (i in prs) {
        console.log(i);
    }
}

function setTheme() {
    chrome.storage.local.get(["themePref"], function(items) {
        var theme = items.themePref;
        if (theme=="light") {
            document.getElementsByTagName("body")[0].className="theme-light";
        }
        else if (theme=="dark") {
            document.getElementsByTagName("body")[0].className="theme-dark";
        }
    })
}

function initialize() {
    setTheme();
    chrome.storage.local.get(["wcaData"], function(items) {
        var keys = items.wcaData;
        var personURL,pbsURL;
        for (var i=0;i<keys.length;i++) {
            var id = keys[i];

            personURL = `${baseURL}/persons/${id}`;
            axios.get(personURL)
                .then(function (response) {
                    var info = response.data.person;   
                    var prs = response.data.personal_records;

                    var metaDiv = createMeta(info);
                    //var pbDiv = createPBs(prs);

                    var personDiv = document.createElement("div")
                    personDiv.className = "person";

                    personDiv.insertAdjacentElement("afterbegin",metaDiv);
                    //personDiv.insertAdjacentElement("afterbegin",pbDiv);
                    
                    document.getElementById("stats").insertAdjacentElement("beforeend",personDiv);
                })

                .catch(function (error) {
                    console.log(error);
                    return error;
                })

                .then(function () {
                    console.log("Called API");
                });  
        }
    })
}



document.addEventListener("DOMContentLoaded",initialize);