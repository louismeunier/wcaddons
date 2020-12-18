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
        for (var i=0;i<keys.length;i++) {
            var id = keys[i];
            /* 
            if (i!=0) {
                console.log(i);
                var barrier = document.createElement("div");
                barrier.setAttribute("class","barrier");
                document.getElementById("stats").insertAdjacentElement("afterend",barrier);
            }
            */

            var route = `/persons/${id}`;
            axios.get(`${baseURL}${route}`)
                .then(function (response) {
                    var info = response.data.person;
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

                    var pbDiv = baseElement("div","pbs");


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