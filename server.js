// ==================== IMPORTACIONES ==================== 
const express = require('express');
const morgan = require('morgan');


// ==================== INICIALIZACIONES ====================
const app = express();
app.set('port', process.env.PORT || 3100);


// ==================== MIDDDLEWARES ====================
app.use((morgan('dev')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));



// ==================== RUTAS ====================
app.use('/', require('./routes/app'));
app.use('/api/productos', require('./routes/productos'));

// ==================== ARRANQUE ====================
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});