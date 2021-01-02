var wcaData;
var apiCalled = false;

const eventIDConverter = {
  "222so":"222",
  "333": "333",
  "333ni":"333bld",
  "333fm":"333fm",
  "333oh":"333oh",
  "444wca":"444",
  "555wca":"555",
  "666wca":"666",
  "777wca":"777",
  "sqrs":"sq1",
  "skbso":"skewb",
  "pyrso":"pyram",
  "mpmp":"minx",
  "clkwca":"clock",
  "444bld":"444bld",
  "555bld":"555bld"
}

function promptForId() {
  var person = prompt("Please enter your wca id");
  if (person != null) {
   return person;
  }
  else {
    return "error";
  }
}

function checkAPI() {
  chrome.storage.local.get(["personalID"], items=> {
    var wcaID
    if (items.personalID=="") {
      wcaID = promptForId();
    }
    else {
      wcaID = items.personalID;
    }
    chrome.runtime.sendMessage(
      {contentScriptQuery: "WCAID", WCAID: wcaID},
      res => {
        wcaData = JSON.parse(res);
        apiCalled = true;
      });  
  })  
}

function compareAO5(scrType) {
  if (scrType===undefined) scrType = "333";
  var wcaEventID = eventIDConverter[scrType];
  var officialAO5 = wcaData.personal_records[wcaEventID].average.best/100;
  if (document.querySelector("#avgstr > span.click")==null) return;
  var currentAO5String = document.querySelector("#avgstr > span.click").innerText.replace("ao5: ","");
  if (currentAO5String=="DNF") return;
  var currentAO5 = currentAO5String.fromMMSSMM()<6000?currentAO5String.fromMMSSMM():currentAO5String.fromMMSSMM()/100;
  var compare = document.createElement("span");
  var compareSign;
  if (currentAO5<officialAO5) {
    compare.style.color = "green";
    compareSign = "-";
  }
  else if (currentAO5>officialAO5) {
    compare.style.color = "red";
    compareSign = "+";
  }
  else {
    compare.style.color = "yellow";
    compareSign="=";
  }

  var dif = Math.round(Math.abs(currentAO5-officialAO5)*100)/100;
  compare.innerText = "    " + compareSign + (dif>=6000?String(dif).toMMSSMM():dif);
  compare.style.fontSize = "75px";
  document.querySelector("#avgstr > span.click").insertAdjacentElement("beforeend",compare);
}

function compareSingle(time) {
  if (document.querySelector("#lcd").style.color=="rgb(255, 0, 0)" ) return;
  var scrType = getSessionInfo();
  if (scrType===undefined) scrType = "333"
  var wcaEventID = eventIDConverter[scrType];
  var officialSingle = wcaData.personal_records[wcaEventID].single.best/100;
  if (time=="DNF") return;
  var currentTime = String(time).fromMMSSMM()<6000?String(time).fromMMSSMM():String(time).fromMMSSMM()/100;
  var compare = document.createElement("span");
  var compareSign;
  //console.log(currentTime);
  if (currentTime<officialSingle) {
    compare.style.color = "green";
    compareSign = "-";
  }
  else if (currentTime>officialSingle) {
    compare.style.color = "red";
    compareSign = "+";
  }
  else {
    compare.style.color = "yellow";
    compareSign="=";
  }
  var dif = Math.round(Math.abs(currentTime-officialSingle)*100)/100;
  compare.innerText = "    " + compareSign + (dif>=6000?String(dif).toMMSSMM():dif);
  compare.style.fontSize = "75px";
  if (!document.querySelector("#lcd>span")) {document.querySelector("#lcd").insertAdjacentElement("beforeend",compare);}
 else {
  document.querySelector("#lcd>span").insertAdjacentElement("beforeend",compare);
}
}

function getSessionInfo() {
  var local = window.localStorage;
  var properties = JSON.parse(local.getItem("properties"));
  var scrType = properties.scrType;
  return scrType;
}
//Gets indexed db (where times, scrambles, etc, are stored)
function getIndexed(rank) {
  var db;
  var dbReq = window.indexedDB.open("cstimer");
  dbReq.onsuccess=event=>{
      db=dbReq.result;
      getData();
  }

  const getData = () => {
      var transaction = db.transaction(["sessions"], "readwrite");
      var objectStore = transaction.objectStore("sessions");

      var objectStoreRequest = objectStore.getAll();

      objectStoreRequest.onsuccess = function(event) {
      //var myRecord = objectStoreRequest.result;
      //var singleRecent = myRecord[rank-1][myRecord[rank-1].length-1][0][myRecord[rank-1][myRecord[rank-1].length-1][0].length-1]/100;
      checkAPI();
    };
  } 
}

//ao5 observer
var a05 = document.querySelector("#avgstr > span:nth-child(1)");
document.addEventListener("DOMContentLoaded",checkAPI());

const observer = new MutationObserver(mutation => {
  if (apiCalled) {
    //Avoids called mutation on page load, basically awaits api to return a value
    compareAO5(getSessionInfo());
  }
});
observer.observe(document.querySelector("#avgstr > span:nth-child(1)"), {
  childList: false,
  attributes: true,
  subtree: true,
  characterData: true
});

//single observer
const singleObserver = new MutationObserver(mutation => {
  var time = (mutation.length==1 && mutation[0].addedNodes[0].data!="solve"?mutation[0].addedNodes[0].data:"")+(mutation[0].addedNodes[1]?mutation[0].addedNodes[1].innerText:"");

  if (time==""||time=="undefined") return;
  compareSingle(time);
})

singleObserver.observe(document.querySelector("#lcd "), {
  childList: true,
  attributes: false,
  subtree: false,
  characterData: true
})