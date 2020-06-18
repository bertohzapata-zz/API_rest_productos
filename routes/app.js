const express = require('express');
const router = express.Router();

router.get('/', async (req, resp) => {

    resp.send('API REST DE PRODUCTOS FUNCIONANDO'); 
});


module.exports = router;