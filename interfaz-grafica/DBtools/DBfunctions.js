const Trama = require('../models/tramas');

// Funcion para guardar en la base de datos (MongoDB)

const obtenerDB = (callback) => {

    Trama.find({})
        .exec((err, tramas) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            callback({
                ok: true,
                tramas
            });


        });


}

module.exports = {
    obtenerDB
}