const mongoose = require = require('mongoose');

//conexion con mongoDB en la nube (Atlas)

// DB local: mongodb://localhost:27017/capturasWifi
mongoose.connect(process.env.URLDB, { // process.env.URLDB

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}, (err, resp) => {

    if (err) throw err;
    console.log('Base de datos ONLINE'.green);

});