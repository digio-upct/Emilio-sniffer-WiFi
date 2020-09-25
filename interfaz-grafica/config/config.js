// ==================
//   Puerto
// ==================

// Ponemos en la variable de entorno 'PORT' el puerto de donde se esté ejecutando o si no el 8000 para local
process.env.PORT = process.env.PORT || 8000;


// ==================
//   Entorno
// ==================

// cambiar  despues del || a 'dev' para guardar en BD local o a cualquier otra cosa paraa MongoDB Atlas (en la nube)
// en caso de ejecutarse la app en heroku o en cualquier otro entorno no local se cambiaria automaticamente
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// 'prod'
// 'dev'

// ==================
//   Base de datos
// ==================

// Si el entorno es 'dev' guardamos en DB local, si no, en DB en la nube
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/capturasWifi';
} else {
    urlDB = 'mongodb+srv://< aqui el usuario >:< aqui el pass >@cluster0.qplg4.mongodb.net/capturasWifi';
}

process.env.URLDB = urlDB;