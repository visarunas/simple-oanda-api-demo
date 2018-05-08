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

function getSelectedInstrumentName() {
    return $("#instrument").val();
}

function getSelectedGranularity() {
    return $("#granularity").find(":selected").val();
}


function displayInstrumentData(responseData) {
    var oandaData = JSON.parse(responseData);
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