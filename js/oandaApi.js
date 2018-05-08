function oandaGetNewestData(instrumentName, granularity, candleAmount, callback) {
    var headers = getAuthorizationHeader();

    httpGet(OANDA_BASE_URL + "/instruments/" + instrumentName + "/candles" 
        + "?granularity=" + granularity
        + "&count=" + candleAmount
        , headers, function(response) 
    {
        callback(response);
    });
}

function oandaGetHistoricalData(instrumentName, granularity, fromDate, toDate, callback) {
    var headers = getAuthorizationHeader();

    httpGet(OANDA_BASE_URL + "/instruments/" + instrumentName + "/candles" 
        + "?granularity=" + granularity
        + "&from=" + fromDate
        + "&to=" + toDate
        , headers, function(response) 
    {
        callback(response);
    });
}   

function oandaPostOrder(instrumentName, data, callback) {
    var headers = getAuthorizationHeader();

    var requestBody = {
        order: data
    }

    httpPost(OANDA_BASE_URL + "/accounts/"+ OANDA_ACCOUNT_ID + "/orders" , headers, requestBody, function(response) {
        callback(response, response.hasOwnProperty("orderFillTransaction"), response.hasOwnProperty("orderCancelTransaction"));
    });
}   


function getAuthorizationHeader() {
    return {Authorization: "Bearer " + OANDA_API_KEY};
}