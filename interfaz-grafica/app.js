require('./config/config.js'); //para seleccionar algunos parametros
require('./DBtools/DBconnect.js'); //para conectar a la BD MongoDB
const fs = require('fs');

const express = require('express');
const app = express();

const colors = require('colors');
const mongoose = require('mongoose');
const path = require('path'); // libreria de node por defecto

const { obtenerDB } = require('./DBtools/DBfunctions')
const Trama = require('./models/tramas.js');
const tramas = require('./models/tramas.js');

app.use(express.static(__dirname + '/public')); //

//obtenemos los datos de las capturas de la base de datos y los guardamos en un json
obtenerDB((resp) => {

    let jsonDataString = JSON.stringify(resp);

    fs.writeFileSync('./public/data/data.json', jsonDataString);

});

//Express HBS engine
//app.set('view engine', 'hbs');

// app.get('/', (req, res) => {

//     //var tabla = '';

//     obtenerDB((resp) => {
//         // //trama = resp.tramas;
//         // //console.log(trama);
//         // trama.forEach(element => {
//         //     tabla +='<tr>'
//         //     tabla +='    <td>' + element.snifferId + '</td>';
//         //     tabla +='    <td>' + element.tipo + '</td>';
//         //     tabla +='    <td>' + element.MAC_origen + '</td>';
//         //     tabla +='    <td>' + element.SSID + '</td>';
//         //     tabla +='    <td>' + element.RSSI + '</td>';
//         //     tabla +='    <td>' + element.frec + '</td>';
//         //     tabla +='    <td>' + element.canal + '</td>';
//         //     tabla +='    <td>' + element.timestamp + '</td>';
//         //     tabla +='</tr>';
//         // });
//         // console.log(tabla);
//         // res.render('home',{
//         //     tablahbs: tabla
//         // });


//     })

//     //res.render('home');

// });


// app.get('/', (req, res) => {

//     obtenerDB((resp) => {
//         res.send(resp);
//     })

//     // Trama.find({})
//     //     .exec((err, tramas) => {

//     //         if (err) {
//     //             return res.status(500).json({
//     //                 ok: false,
//     //                 err
//     //             });
//     //         }

//     //         res.json({
//     //             ok: true,
//     //             tramas
//     //         })

//     //     });

// })

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto ', process.env.PORT);
})