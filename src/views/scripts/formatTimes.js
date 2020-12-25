String.prototype.fromMMSSMM = function () {
    var res = this;
    if (res=="-") {
        console.log("NONE");
        return Infinity;
    }
    else if (res.indexOf(":")==-1) {
        return parseFloat(res);
    }
    else {
        var minutes = this.slice(0,res.indexOf(":"));
        var seconds = this.slice(res.indexOf(":")+1,res.indexOf("."));
        var milliseconds = this.slice(res.indexOf(".")+1);

        var raw = ((6000*parseInt(minutes))+(100*parseInt(seconds))+(parseInt(milliseconds)));
        return raw
    }
}

String.prototype.toMMSSMM = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 360000);
    var minutes = Math.floor((sec_num - (hours * 360000)) / 6000);
    var seconds = Math.trunc((sec_num - (hours * 360000) - (minutes * 6000))/100);
    var milliseconds = sec_num-((100*seconds)+(6000*minutes));
    //if (hours   < 10) {hours   = "0"+hours;}
    //if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    if (milliseconds< 10) {milliseconds = "0"+milliseconds;}

    return minutes+':'+seconds+'.'+milliseconds;
}

function formatResult(event,result) {
    ["222","333","444","555","666","777","333bf","333fm","333oh","clock","minx","pyram","skewb","sq1","444bf","555bf","333mbf"]
    if (event!="333fm" && event!="333mbf") {
        result = result;
        if (result<6000) {
            return result/100;
        }
        else {
            return String(result).toMMSSMM();
        }
    }
    else if (event=="333mbf") {
        return result;
    }
    else if (event=="333fm") {
        if (result>1000) {
            return result/100;
        } 
        else {
            return result;
        }
    }
}