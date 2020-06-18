const express = require('express');
const router = express.Router();

const pool = require('../database/database');

/* ================== CONSULTAR TODOS LOS PRODUCTOS  ================== */
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
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al consultar los datos de productos',
            error
        });
    } finally {
        (await pool).releaseConnection(connection);
    }
});

/* ================== CONSULTAR PRODUCTO POR ID  ================== */
router.get('/:id', async(req, res) => {
    const connection = await (await pool).getConnection();
    try {
        await connection.beginTransaction();

        const id = req.params.id;

        const producto = connection.query('SELECT * FROM productos WHERE id = ?', id);
       
        await connection.commit();

        res.status(200).json({
            ok: true,
            producto: producto
        });

    } catch (error) {
        await connection.rollback();
        return res.status(500).json({
            ok: false,
            error
        });
    } finally {
        (await pool).releaseConnection(connection);
    }
});






/* ================== CREAR UN PRODUCTO NUEVO  ================== */
router.post('/', async (req, res) => {
    const connection = await (await pool).getConnection();
    try {

        /* const { clave,nombreproducto,descripcion,precio,marca,img } = req.body; */
        const newProducto = req.body;

        const productoGuardado = await connection.query('INSERT INTO productos SET ?', [newProducto]);

        res.status(200).json({
            ok: true,
            productoGuardado
        });

    } catch (error) {
        await connection.rollback();
        return res.status(500).json({
            ok: false,
            error
        });
    } finally {
        (await pool).releaseConnection(connection);
    }
});


/* ================== EDITAR PRODUCTO POR ID  ================== */
router.put('/:id', async(req, res) => {
    const connection = await (await pool).getConnection();
    try {
        await connection.beginTransaction();

        const id = req.params.id;
        const editProducto = req.body;

        const productoMod = connection.query('UPDATE productos SET ? WHERE id = ? ', [editProducto, id]);
       
        await connection.commit();

        res.status(200).json({
            ok: true,
            productoMod: productoMod,
            mensaje: 'Registro actualizado correctamente'
        });

    } catch (error) {
        await connection.rollback();
        return res.status(500).json({
            ok: false,
            error
        });
    } finally {
        (await pool).releaseConnection(connection);
    }
});

module.exports = router;