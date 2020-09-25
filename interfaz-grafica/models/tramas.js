const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let tramaSchema = new Schema({
    snifferId: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    SSID: {
        type: String,
        required: true
    },
    RSSI: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    MAC_origen: {
        type: String,
        required: true
    },
    frec: {
        type: String,
        required: true
    },
    canal: {
        type: String,
        required: true
    },

}, { capped: 1048576 }); // "capamos" la Coleccion a 1MB de memoria (unos 5000 tramas) para que no crezca indefinidamente

module.exports = mongoose.model('Trama', tramaSchema);