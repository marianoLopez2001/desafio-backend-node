const express = require('express');
const { Router } = express
const router = new Router()

const PORT = 8080;
const app = express()

// MIDDLEWARE

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//FORMULARIO EN "/"
app.use(express.static("./public"))

const server = app.listen(PORT, () => {
    console.log(`servidor expres desde el puerto: ${PORT}`);
})

//MANEJO DE ERRORES
server.on("error", error => {
    console.log(error);
})

//ARRAY PARA PERSISTENCIA DE MEMORIA
const productos = []

//CONFIG DE ROUTER/RUTA RAIZ
app.use('/api', router)

//RUTAS GET
app.get("/", (req, res) => {
    res.json("ruta raiz")
})

router.get("/productos", (req, res) => { //RUTA /API/PROUCTOS
    res.json({ productos, productos })
})

router.get("/productos/:id", (req, res) => { //RUTA /API/PROUCTOS/:ID
    const productoEncontrado = productos.find(i => parseInt(i.id) === parseInt(req.params.id))
    if (!productoEncontrado) {
        res.json({ error: "producto no encontrado" })
    } else {
        res.json(productoEncontrado)
    }
})

//RUTAS CON METODO POST

router.post("/productos", (req, res) => {
    const newObj = req.body
    productos.push({ ...newObj, id: productos.length + 1 })
    res.json("recibida")
})

//RUTA CON METODO PUT

router.put("/productos/:id", (req, res) => {
    const { title, price, thumbnail } = req.body
    const { id } = req.params
    productos[parseInt(id - 1)].title = title
    productos[parseInt(id - 1)].price = price
    productos[parseInt(id - 1)].thumbnail = thumbnail
    res.json("producto modificado")
})

//RUTA CON METODO DELETE SEGUN EL ID 

router.delete("/productos/:id", (req, res) => {
    const productoEncontrado = productos.find(i => parseInt(i.id) === parseInt(req.params.id))
    if (!productoEncontrado) {
        res.json({ error: "producto no encontrado" })
    } else {
        productos.splice(productos.indexOf(productoEncontrado), 1)
        res.send("Producto eliminado")
    }
})






