function oandaGetNewestData(instrumentName, granularity, candleAmount, callback) {
    var headers = getAuthorizationHeader();

    httpGet(OANDA_BASE_URL + "/v3/instruments/" + instrumentName + "/candles" 
        + "?granularity=" + granularity
        + "&count=" + candleAmount
        , headers, function(response) 
    {
        callback(response);
    });
}

function oandaGetHistoricalData(instrumentName, granularity, fromDate, toDate, callback) {
    var headers = getAuthorizationHeader();

    httpGet(OANDA_BASE_URL + "/v3/instruments/" + instrumentName + "/candles" 
        + "?granularity=" + granularity
        + "&from=" + fromDate
        + "&to=" + toDate
        , headers, function(response) 
    {
        callback(response);
    });
}   

function getAuthorizationHeader() {
    return {Authorization: "Bearer " + OANDA_API_KEY};
}