class Meta {
    /*
    Constructs the meta section of each person's profile, including: name,picture,id,country,solves (#), and comps (#).
    */
    constructor(info) {
        self.info = info;
        self.elements = [];
    }
    baseElement(type,className=null,content=null) {
        var newElement = document.createElement(type);
        if (content) {
            newElement.setAttribute("class",className);
        }
        if (className) {
            newElement.innerText = content;
        }
        return newElement;
    }
    getMeta() {
        return this.generateMeta();
    }
    generateMeta() {
        //bug: avatar and meta div not getting classes assigned...
        var div = this.baseElement("div","meta");
        
        var avatar = this.baseElement("img","avatar");
        avatar.src = self.info.avatar;
        avatar.style.height = "120px";
        var id = this.baseElement("h2","wca-id",self.info.id);
        var name = this.baseElement("h1","name",self.info.name);
        var country = this.baseElement("h2","country",self.info.country);
        //Is gender really necessary to have...?
        var solvesPerComp = `${self.info.solveCount} solves, ${self.info.compCount} comps`;
        var solvesPerCompElement = this.baseElement("h2","solves-per-comp",solvesPerComp);
        div.insertAdjacentElement("afterbegin",solvesPerCompElement);
        div.insertAdjacentElement("afterbegin",country);
        div.insertAdjacentElement("afterbegin",avatar);
        div.insertAdjacentElement("afterbegin",id);
        div.insertAdjacentElement("afterbegin",name);
        
        return div;
    }
}

class Person {
    /*
    Constructs the person
    */
    constructor(info) {
        self.info=info;
        self.meta = new Meta(self.info);
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
        var people = [];
        var keys = Object.keys(items.wcaData);
        for (var i=0;i<keys.length;i++) {
            console.log(i);
            var person = new Person(items.wcaData[keys[i]]["meta"]);
            people.push(person);
            document.getElementById("stats").insertAdjacentElement("beforeend",person.getPerson());
            //This logic adds a div between each element but NOT at the end of the last one or before the first
            if (i!=keys.length-1) {
                var barrier = document.createElement("div");
                barrier.setAttribute("class","barrier");
                document.getElementById("stats").insertAdjacentElement("beforeend",barrier);
            } 
        }
    })
    
}

document.addEventListener("DOMContentLoaded",initialize);