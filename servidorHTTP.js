const http = require("http");

const horaActual = new Date().getHours()

const server = http.createServer((req, res) => {
    res.end(`hora actual: ${horaActual}`)
})

const serverOnline = server.listen(8085, () => {
    console.log(`Servidor escuchando en el puerto ${serverOnline.address().port}`
    );
})

console.log(Date.now());