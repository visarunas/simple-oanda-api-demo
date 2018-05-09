$(document).ready(function() {
    $('input[name="datetimes"]').daterangepicker({
        timePicker: true,
        startDate: moment().startOf('hour').add(-30, 'day'),
        endDate: moment().startOf('hour'),
        maxDate: moment(),
        locale: {
            format: 'YYYY/MM/DD hh:mm A'
        }
    });

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(loadNewestData);
});

function loadNewestData() {
    oandaGetNewestData(getSelectedInstrumentName(), getSelectedGranularity(), 50, displayInstrumentData);
}

function loadHistoricalData() {
    var dateArray = $("#date").val().split("-");
    var fromDate = Math.floor((new Date(dateArray[0])).getTime() / 1000)
    var toDate = Math.floor((new Date(dateArray[1])).getTime() / 1000)

    //console.log(fromDate)
    //console.log(toDate)

    oandaGetHistoricalData(getSelectedInstrumentName(), getSelectedGranularity(), fromDate, toDate, displayInstrumentData);
}

function postNewOrder() {
    var instrument = getSelectedInstrumentName();
    var units = $("#units").val();
    var price = $("#price").val();
    var timeInForce = $("#timeInForce").find(":selected").val();
    var type = $("#type").find(":selected").val();
    var positionFill = $("#positionFill").find(":selected").val();

    var orderOptions = {
        units,
        instrument,
        timeInForce,
        type,
        positionFill
    }

    if (type == "LIMIT") {
        orderOptions.price = price;
    }

    oandaPostOrder(getSelectedInstrumentName(), orderOptions, function(response, orderId, filled, cancelled) {
        console.log(response);
        if (cancelled) alert("Order " + orderId + " cancelled");
        else if (filled) alert("Order " + orderId + " filled");
        else alert("Order " + orderId + " created")
    })

}

function cancelOrder() {
    var orderId = $("#cancelOrderId").val();

    oandaCancelOrder(orderId, function(response, cancelled) {
        console.log(response);
        if (cancelled) alert("Order " + orderId + " cancelled");
    })
}

function closePosition() {
    var closePositionAmount = $("#closePositionAmount").val();
    var instrument = getSelectedInstrumentName();

    oandaClosePosition(instrument, closePositionAmount, function(response) {
        console.log(response);
    })
}

function loadCurrentData() {
    var instrument = getSelectedInstrumentName();

    oandaGetCurrentData(instrument, function(response) {
        console.log(response);
        $("#curentPrice").val(response.prices[0].closeoutAsk);
    })
}

function getSelectedInstrumentName() {
    return $("#instrument").val();
}

function getSelectedGranularity() {
    return $("#granularity").find(":selected").val();
}


function displayInstrumentData(oandaData) {
    console.log(oandaData)

    var googleFormatData = convertOandaDataToGoogleData(oandaData);

    var data = google.visualization.arrayToDataTable(googleFormatData, true);
    drawGoogleChart(data);
}

function drawGoogleChart(data) {
    var options = {
        legend:'none',
        candlestick: {
            fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
            risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
        }
    };

    var chart = new google.visualization.CandlestickChart(document.getElementById('chart'));

    chart.draw(data, options);
}

function convertOandaDataToGoogleData(oandaData) {
    var googleFormatData = [];

    oandaData.candles.forEach(function(element) {
        googleFormatData.push([new Date(element.time), parseFloat(element.mid.l), parseFloat(element.mid.o), parseFloat(element.mid.c), parseFloat(element.mid.h)]);
    });

    return googleFormatData;
}