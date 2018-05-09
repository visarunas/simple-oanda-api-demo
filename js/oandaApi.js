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
        callback(response, response.orderCreateTransaction.id, response.hasOwnProperty("orderFillTransaction"), response.hasOwnProperty("orderCancelTransaction"));
    });
}   

function oandaClosePosition(instrument, amount, callback) {
    var headers = getAuthorizationHeader();
    
    var requestBody = {
        longUnits: amount
    }
    
    httpPut(OANDA_BASE_URL + "/accounts/" + OANDA_ACCOUNT_ID + "/positions/" + instrument + "/close" , headers, requestBody, function(response) {
        callback(response);
    });
}

function oandaCancelOrder(orderId, callback) {
    var headers = getAuthorizationHeader();

    httpPut(OANDA_BASE_URL + "/accounts/"+ OANDA_ACCOUNT_ID + "/orders/" + orderId + "/cancel" , headers, {}, function(response) {
        callback(response, response.hasOwnProperty("orderCancelTransaction"));
    });
}

function oandaGetCurrentData(instrument, callback) {
    var headers = getAuthorizationHeader();

    httpGet(OANDA_BASE_URL + "/accounts/" + OANDA_ACCOUNT_ID + "/pricing" 
        + "?instruments=" + instrument
        , headers, function(response) 
    {
        callback(response);
    });
}


function getAuthorizationHeader() {
    return {Authorization: "Bearer " + OANDA_API_KEY};
}