function httpGet(url, headers, callback) {
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        headers: headers,
        success: function(response){
            callback(response);        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        }    
    });

}

function httpPost(url, headers, data, callback) {
    console.log(data)
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        headers: headers,
        data: JSON.stringify(data),
        success: function(response) {
            callback(response);        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        }    
    });
}

function httpPut(url, headers, data, callback) {
    $.ajax({
        type: "PUT",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        headers: headers,
        success: function(response){
            callback(response);        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        }    
    });
}