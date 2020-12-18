export var baseURL = "https://www.worldcubeassociation.org/api/v0";

//creates actual request and returns response
export const getRequest = (route) => {
    var xml = new XMLHttpRequest();
    var url = `${baseURL}${route}`;
    xml.open("GET",url);
    xml.send();
    xml.onreadystatechange = function() {
        if (this.readyState==4 && this.status==200) {
            console.log(xml.responseText);

        } 
    }
} 
//all other things should create the subroutes and call above function
export const results = wcaID => {
    var route = `/persons/${wcaID}/results`;
    return getRequest(route);
}