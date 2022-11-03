const express = require('express');

const PORT = 8085;

let vistas = 0;

const app = express()

app.get('/', (req, res) => {
    res.send('<h1 style="color: blue;">Bienvenido al servidor express</h1>'
    )
})

app.get('/vistas', (req, res) => {
    vistas++
    res.send(`vistas: ${vistas}`)
})

const server = app.listen(PORT, () => {
    console.log(`servidor expres desde el puerto: ${PORT}`);
})

server.on("error", error => {
    console.log(`Èrror en server ${error}`);
})