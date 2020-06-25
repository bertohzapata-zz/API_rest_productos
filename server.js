// ==================== IMPORTACIONES ==================== 
const express = require('express');
/* const morgan = require('morgan'); */


// ==================== INICIALIZACIONES ====================
const app = express();
app.set('port', process.env.PORT || 3100);


// ==================== MIDDDLEWARES ====================
/* app.use((morgan('dev'))); */
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



// ==================== RUTAS ====================
app.use('/', require('./routes/app'));
app.use('/api/productos', require('./routes/productos'));

// ==================== ARRANQUE ====================
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});