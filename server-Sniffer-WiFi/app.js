//inicializacion base de datos en MongoDB
require('./config/config.js'); //para seleccionar algunos parametros
require('./DBtools/DBconnect.js'); //para conectar a la BD MongoDB

const dgram = require('dgram');
const colors = require('colors');

const server = dgram.createSocket('udp4');

const { guardarDB } = require('./DBtools/DBfunctions')

// inicializacion del server y procesado de mensajes recibidos
server.on('error', (err) => {
    console.log(`error en el servidor:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {

    var datos = JSON.parse(msg);

    // console.log(datos);

    var { snifferId, tipo, SSID, RSSI, timestamp, MAC_origen, frec, canal } = datos;

    console.log('==================='.green);
    console.log(`===${tipo}===`.green);
    console.log('==================='.green);

    console.log(`ssid: ${ SSID }`);
    console.log(`RSSI: ${ RSSI } dBm`);
    console.log(`TimeStamp: ${ timestamp }`);
    console.log(`MAC origen: ${ MAC_origen }`);
    console.log(`frecuencia: ${ frec } Mhz, canal: ${ canal }`);

    console.log(`capturado desde ${ snifferId }, ${rinfo.address}:${rinfo.port}`);

    //console.log(JSON.parse(msg));
    //guardar en base de datos MongoDB
    guardarDB(datos)

});

server.on('listening', () => {
    const address = server.address();
    console.log(`servidor escuchando en ${address.address}:${address.port}`);
});

server.bind(process.env.PORT, '192.168.1.6');

// //conexion con mongoDB en la nube (Atlas)
// mongoose.connect('mongodb://localhost:27017/tramas', { // process.env.URLDB

//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true

// }, (err, resp) => {

//     if (err) throw err;
//     console.log('Base de datos ONLINE'.green);

// });