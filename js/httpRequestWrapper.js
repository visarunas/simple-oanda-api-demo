function httpGet(url, headers, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    }

    xmlHttp.open("GET", url, true); // true for asynchronous 

    for (var key in headers) {
        if (headers.hasOwnProperty(key)) {
            xmlHttp.setRequestHeader(key, headers[key]); 
        }
    }
    
    xmlHttp.send(null);
}