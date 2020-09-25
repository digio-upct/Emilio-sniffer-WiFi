require('./config/config.js'); //para seleccionar algunos parametros
require('./DBtools/DBconnect.js'); //para conectar a la BD MongoDB

const express = require('express');
const app = express();

const colors = require('colors');
const mongoose = require('mongoose');
const path = require('path'); // libreria de node por defecto


const { obtenerDB } = require('./DBtools/DBfunctions')
const Trama = require('./models/tramas.js');

app.get('/', (req, res) => {

    obtenerDB((resp) => {
        res.send(resp);
    })

    // Trama.find({})
    //     .exec((err, tramas) => {

    //         if (err) {
    //             return res.status(500).json({
    //                 ok: false,
    //                 err
    //             });
    //         }

    //         res.json({
    //             ok: true,
    //             tramas
    //         })

    //     });

})

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto ', process.env.PORT);
})