class Meta {
    constructor(info) {
        //info should be the meta object for the desired person
        self.info = info;
    }
    getMeta() {
        return this.generateMeta();
    }
    generateMeta() {
        //add rest of attributes later if this method works
        //maybe seperate each element into different methods?
        var div = document.createElement("div");
        div.className="meta";
        var avatar = document.createElement("img");
        avatar.src = self.info.avatar;
        avatar.style.height = "45px";
        var name = document.createElement("h1");
        name.innerText = self.info.name;
        div.insertAdjacentElement("afterbegin",avatar);
        div.insertAdjacentElement("afterbegin",name);
        return div;
    }
}

class Person {
    constructor(id) {
        self.id=id;
        self.meta = new Meta(self.id);
    }
    getPerson() {
        return this.generatePerson();
    }
    generatePerson() {

        var personDiv = document.createElement("div")
        personDiv.className = "person";
        personDiv.insertAdjacentElement("afterbegin",self.meta.generateMeta());
        return personDiv;
    }
}

function initialize() {
    chrome.storage.local.get(["wcaData"], function(items) {
        console.log(items.wcaData);
        for (var i=0;i<Object.keys(items.wcaData).length;i++) {
            console.log(i);
            //var meta = items.wcaData[Object.keys(items.wcaData)[i]]["meta"];
            var person = new Person(items.wcaData[Object.keys(items.wcaData)[i]]["meta"]);
            document.getElementById("stats").insertAdjacentElement("afterbegin",person.getPerson());
        }
    })
    
}

document.addEventListener("DOMContentLoaded",initialize);