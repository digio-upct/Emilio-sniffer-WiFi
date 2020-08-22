const pcap = require('pcap');
const colors = require('colors')
const dgram = require('dgram');

const client = dgram.createSocket('udp4');

const snifferId = 'laptop1';

const {
    parseType,
    parseSSID,
    parseRSSI,
    parseSourceMAC,
    parseFreq
} = require('./functions');

// creamos sesion de pcap indicando interfaz (en modo monitor con airmon-ng) y filtros
// sustituir interfaz por la del dispositivo en el que se ejecuta la app
var pcapSession = pcap.createSession('wlp3s0mon', { filter: 'type mgt subtype probe-req or subtype beacon' });
// var pcapSession = pcap.createSession('wlp3s0mon', ' wlan type mgt subtype probe-req');

pcapSession.on('packet', (rawPacket) => {
    // Esta función decodifica el paquete de bytes en bruto, interpretando algunos campos
    // pero no funciona para todos los vendors (en mi tarjeta WiFi p.ej no funciona)
    // var packet = pcap.decode.packet(rawPacket);

    //     console.log('from: ' + packet.link.ieee802_11Frame.shost);
    //     console.log('to: ' + packet.link.ieee802_11Frame.dhost);
    //     console.log('signal strength: ' + packet.link.ieee802_11Frame.strength);

    // Así que trato directamente el paquete con los bytes en bruto, y así es totálmente vendor independent
    var length_RT = rawPacket.buf[2]; //longitud del RadioTap Header
    var tipo = parseType(rawPacket.buf, length_RT);
    var date = new Date();

    console.log('==================='.green);
    console.log(`===${tipo}===`.green);
    console.log('==================='.green);

    var SSID = parseSSID(rawPacket.buf, length_RT, tipo);
    var RSSI = parseRSSI(rawPacket.buf, length_RT);
    var timestamp = `${ date.toLocaleString() }:${ date.getMilliseconds() }`;
    var MAC_origen = parseSourceMAC(rawPacket.buf, length_RT);
    var frec = parseFreq(rawPacket.buf, length_RT);
    var canal = (frec % 2407) / 5;

    console.log(`ssid: ${ SSID }`);
    console.log(`RSSI: ${ RSSI } dBm`);
    console.log(`TimeStamp: ${ timestamp}`);
    console.log(`MAC origen: ${ MAC_origen }`);
    console.log(`frecuencia: ${ frec } Mhz, canal: ${ canal }`);

    var datos = {
        snifferId,
        tipo,
        SSID,
        RSSI,
        timestamp,
        MAC_origen,
        frec,
        canal
    }

    // console.log(datos);

    var message = new Buffer.from(JSON.stringify(datos));
    // cambiar datos por los del server
    client.send(message, 8000, '192.168.1.6');

});