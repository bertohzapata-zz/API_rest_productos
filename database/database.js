const mysql = require('promise-mysql');
const { database } = require('../config/keys');

const pool = mysql.createPool(database);



pool 
.then((p) => {
    return p.getConnection();
})
.then(connection => {
    connection.release();
    console.log('Base de datos conectada');
})
.catch(error => {
    console.log(error);
    
})

module.exports = pool;