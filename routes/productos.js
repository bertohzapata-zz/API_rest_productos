const express = require('express');
const router = express.Router();

const pool = require('../database/database');

router.get('/', async (req, res) => {

    const connection = await (await pool).getConnection();
    try {
        await connection.beginTransaction();
        const query = 'SELECT * FROM productos';
        const productos = await connection.query(query);

        await connection.commit();
        res.status(200).json({
            ok: true,
            productos
        });
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return res.status(400).json({
            ok: false,
            error
        });
    }
    finally {
        (await pool).releaseConnection(connection);
    }
});


module.exports = router;