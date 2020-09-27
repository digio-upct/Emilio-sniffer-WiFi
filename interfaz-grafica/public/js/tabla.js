// Referencias de jQuery

var datos

$.getJSON('data/data.json', function(data) {
    datos = data.tramas;

    // console.log(table);

    var tabla = '';

    tabla += '    <thead>'
    tabla += '        <tr>'
    tabla += '            <th>Sniffer id</th>'
    tabla += '            <th>Tipo</th>'
    tabla += '            <th>MAC origen</th>'
    tabla += '            <th>SSID</th>'
    tabla += '            <th>RSSI</th>'
    tabla += '            <th>Frec</th>'
    tabla += '            <th>Canal</th>'
    tabla += '            <th>timestamp</th>'
    tabla += '        </tr>'
    tabla += '    </thead>'
    tabla += '    <tfoot>'
    tabla += '        <tr>'
    tabla += '            <th>Sniffer id</th>'
    tabla += '            <th>Tipo</th>'
    tabla += '            <th>MAC origen</th>'
    tabla += '            <th>SSID</th>'
    tabla += '            <th>RSSI</th>'
    tabla += '            <th>Frec</th>'
    tabla += '            <th>Canal</th>'
    tabla += '            <th>timestamp</th>'
    tabla += '        </tr>'
    tabla += '    </tfoot>'

    tabla += '    <tbody>'

    datos.forEach(element => {
        tabla += '        <tr>'
        tabla += '            <td>' + element.snifferId + '</td>';
        tabla += '            <td>' + element.tipo + '</td>';
        tabla += '            <td>' + element.MAC_origen + '</td>';
        tabla += '            <td>' + element.SSID + '</td>';
        tabla += '            <td>' + element.RSSI + '</td>';
        tabla += '            <td>' + element.frec + '</td>';
        tabla += '            <td>' + element.canal + '</td>';
        tabla += '            <td>' + element.timestamp + '</td>';
        tabla += '        </tr>';
    });

    tabla += '    </tbody>'
        // tabla += '</table>'

    //console.log(tabla);

    $("#dataTable").append(tabla);


});