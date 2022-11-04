const express = require('express');
const fs = require('fs')

const PORT = 8080;
const app = express()

//CLASE + ASIGNACION DE LA DATA A UNA VARIABLE

class Contenedor {

    constructor(nombre) {
        this.nombre = nombre;
    }

    getAll() {
        try {
            const lectura = fs.readFileSync(this.nombre, "utf-8")
            return lectura
        }
        catch (error) {
            throw new Error("Error en la lectura")
        }
    }
}

const contenedor1 = new Contenedor('./productos.json')

let data = contenedor1.getAll()

//LOGICA DE EXPRESS Y FS

app.get('/', (req, res) => {
    res.send('<h1 style="color: blue;">Bienvenidos al servidor express</h1>'
    )
})

app.get('/productos', (req, res) => {
    res.send(`Array de productos disponibles: <br><br> ${JSON.stringify(data)}`)
})

data = JSON.parse(data)

app.get('/productoRandom', (req, res) => {
    res.send(`Productos random: <br><br> ${JSON.stringify(data[Math.floor(Math.random() * data.length)])}`)
})

const server = app.listen(PORT, () => {
    console.log(`servidor expres desde el puerto: ${PORT}`);
})

server.on("error", error => {
    console.log(`Èrror en server ${error}`);
})