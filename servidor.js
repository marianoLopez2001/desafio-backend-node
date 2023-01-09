import express from 'express'
import { instanciaProductosDao, instanciaCarritoDao } from './daos/dao.js';

const app = express()
const PORT = 8080

app.listen(PORT, () => {
    console.log(`express server corriendo en ${PORT}`);
})

app.get('/', (req, res) => {
    instanciaProductosDao.listAll()
    res.send('asd')
})


