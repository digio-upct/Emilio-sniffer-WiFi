const dgram = require('dgram');
const colors = require('colors');

const server = dgram.createSocket('udp4');


server.on('error', (err) => {
    console.log(`error en el servidor:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {

    var datos = JSON.parse(msg);

    var { type, SSID, RSSI, timestamp, MAC_origen, frec, canal } = datos;

    console.log('==================='.green);
    console.log(`===${type}===`.green);
    console.log('==================='.green);

    console.log(`ssid: ${ SSID }`);
    console.log(`RSSI: ${ RSSI } dBm`);
    console.log(`TimeStamp: ${ timestamp }`);
    console.log(`MAC origen: ${ MAC_origen }`);
    console.log(`frecuencia: ${ frec } Mhz, canal: ${ canal }`);

    console.log(`capturado desde ${rinfo.address}:${rinfo.port}`);

    //console.log(JSON.parse(msg));
});

server.on('listening', () => {
    const address = server.address();
    console.log(`servidor escuchando en ${address.address}:${address.port}`);
});

server.bind(8000, '192.168.1.6');