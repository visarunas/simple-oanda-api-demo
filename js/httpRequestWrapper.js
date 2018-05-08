function httpGet(url, headers, callback) {
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        headers: headers,
        success: function(response){
            callback(response);        
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(textStatus);
        }    
    });

    /*
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
    */
}

function httpPost(url, headers, data, callback) {
    console.log(data)
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        headers: headers,
        data: JSON.stringify(data),
        success: function(response){
            callback(response);        
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(textStatus);
        }    
    });
}