const Trama = require('../models/tramas');

// Funcion para guardar en la base de datos (MongoDB)

const guardarDB = (data) => {

    let trama = new Trama({
        snifferId: data.snifferId,
        tipo: data.tipo,
        SSID: data.SSID,
        RSSI: data.RSSI,
        timestamp: data.timestamp,
        MAC_origen: data.MAC_origen,
        frec: data.frec,
        canal: data.canal
    });

    trama.save((err, tramaDB) => {

        if (err) {
            return console.log('error al guardar en DB');
        }

        return console.log('ok al guardar en DB');

    });


}

module.exports = {
    guardarDB
}


// snifferId: {
//     type: String,
//     required: true
// },
// tipo: {
//     type: String,
//     required: true
// },
// SSID: {
//     type: String,
//     required: true
// },
// RSSI: {
//     type: String,
//     required: true
// },
// timestamp: {
//     type: String,
//     required: true
// },
// MAC_origen: {
//     type: String,
//     required: true
// },
// frec: {
//     type: String,
//     required: true
// },
// canal: {
//     type: String,
//     required: true
// },