const express = require('express')
const { Router } = express
const fs = require('fs')

const app = express()
const PORT = 8080

//MIDDLEWARE PARA TRABAJAR CON ARCHIVOS JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//CONFIG DE RUTAS ROUTER
const routerCarrito = new Router()
const routerProductos = new Router()

app.use('/api/carrito', routerCarrito)
app.use('/api/productos', routerProductos)

//MIDDLEWARE QUE VERIFICA EL ROL ADMIN

function mdwAdmin(req, res, next) {
    if (req.query.rol !== "admin") {
        res.json({ error: "acceso no permitido", descripcion: "ruta x con metodo y no autorizada" })
        //http://localhost:8080/api/productos?rol=admin
        return
    }
    next()
}

//CONFIG DE RUTAS DE PRODUCTOS

routerProductos.get("/", (req, res) => {
    const productos = fs.readFileSync('productos.json', 'utf-8')
    res.json(JSON.parse(productos))
})

routerProductos.get("/:id", (req, res) => { //http://localhost:8080/api/productos/5
    const lectura = fs.readFileSync("productos.json", "utf-8")
    const objEncontrado = JSON.parse(lectura).find(i => i.id === parseInt(req.params.id))
    objEncontrado ? res.json(objEncontrado) : res.json({ Error: "Objeto no encontrado" })
})

routerProductos.post("/", mdwAdmin, (req, res) => {
    const lectura = fs.readFileSync('productos.json', "utf-8")
    const lecturaParseada = JSON.parse(lectura)
    let id = lecturaParseada.length + 1
    const objetoNuevo = { ...req.body, id: id, timestamp: Date.now() }
    lecturaParseada.push(objetoNuevo)
    fs.writeFileSync('productos.json', JSON.stringify(lecturaParseada), "utf-8")
    res.json({ exito: "producto agregado" })
})

routerProductos.put("/:id", mdwAdmin, (req, res) => {
    const lectura = fs.readFileSync('productos.json', "utf-8")
    const lecturaParseada = JSON.parse(lectura)
    const objEncontrado = lecturaParseada.find(i => i.id === parseInt(req.params.id))
    if (!objEncontrado) {
        res.json({ Error: "Objeto no encontrado" })
        return
    }
    const newObj = { ...req.body, id: objEncontrado.id, timestamp: objEncontrado.timestamp, ultimaModificacion: Date.now() }
    lecturaParseada.splice(lecturaParseada.indexOf(objEncontrado), 1, newObj)
    fs.writeFileSync('productos.json', JSON.stringify(lecturaParseada), 'utf-8')
    res.json({ exito: "producto modificado" })
})

routerProductos.delete("/:id", mdwAdmin, (req, res) => {
    const lectura = fs.readFileSync('productos.json', "utf-8")
    const lecturaParseada = JSON.parse(lectura)
    const objEncontrado = lecturaParseada.find(i => i.id === parseInt(req.params.id))
    if (!objEncontrado) {
        res.json({ Error: "Objeto no encontrado" })
        return
    }
    const newLectura = lecturaParseada.filter(i => i.id !== objEncontrado.id)
    fs.writeFileSync('productos.json', JSON.stringify(newLectura), "utf-8")
    res.json({ exito: "producto eliminado" })
})

//CONFIG DE RUTAS DE CARRITO

routerCarrito.post('/', (req, res) => {
    const lectura = fs.readFileSync('carrito.json', "utf-8")
    const lecturaParseada = JSON.parse(lectura)
    let id = lecturaParseada.length + 1
    lecturaParseada.push({ id: id, timestamp: Date.now(), productos: [] })
    fs.writeFileSync('carrito.json', JSON.stringify(lecturaParseada), 'utf-8')
    res.json({ "exito": "carrito creado" })
})

routerCarrito.delete('/:id', (req, res) => {
    const lectura = fs.readFileSync('carrito.json', "utf-8")
    const lecturaParseada = JSON.parse(lectura)
    const carritoEncontrado = lecturaParseada.find(i => i.id === parseInt(req.params.id))
    console.log(carritoEncontrado, req.params.id);
    if (!carritoEncontrado) {
        res.json({ Error: "Carrito no encontrado" })
        return
    }
    const carritoFiltrado = lecturaParseada.filter(i => i.id !== carritoEncontrado.id)
    fs.writeFileSync('carrito.json', JSON.stringify(carritoFiltrado), 'utf-8')
    res.json({ exito: "carrito eliminado" })
})

routerCarrito.get('/:id/productos', (req, res) => {
    const lectura = fs.readFileSync('carrito.json', "utf-8")
    const lecturaParseada = JSON.parse(lectura)
    const carrito = lecturaParseada[req.params.id - 1]
    if (!carrito) {
        res.json({ Error: "Carrito no encontrado" })
        return
    }
    const productos = carrito.productos
    res.json({ exito: `producto del carrito ${req.params.id} mostrados con exito`, productos })
})


routerCarrito.post('/:id/productos', (req, res) => {
    const lectura = fs.readFileSync('carrito.json', "utf-8")
    const lecturaParseada = JSON.parse(lectura)
    const carrito = lecturaParseada[req.params.id - 1]
    if (!carrito) {
        res.json({ Error: "Carrito no encontrado" })
        return
    }
    let id = lecturaParseada[parseInt(req.params.id - 1)].productos.length + 1
    const newObj = { ...req.body, id: id, timestamp: Date.now() }
    carrito.productos.push(newObj)
    fs.writeFileSync('carrito.json', JSON.stringify(lecturaParseada), 'utf-8')
    res.json({ exito: "exito" })
})

routerCarrito.delete('/:id/productos/:id_prod', (req, res) => {
    const lectura = fs.readFileSync('carrito.json', "utf-8")
    const lecturaParseada = JSON.parse(lectura)
    const carrito = lecturaParseada[parseInt(req.params.id - 1)]
    if (!carrito) {
        res.json({ Error: "Carrito no encontrado" })
        return
    }
    const objEncontrado = carrito.productos.find(i => i.id === parseInt(req.params.id_prod))
    if (!objEncontrado) {
        res.json({ Error: "Objeto no encontrado" })
        return
    }
    lecturaParseada[parseInt(req.params.id - 1)].productos.splice(lecturaParseada[parseInt(req.params.id - 1)].productos.indexOf(objEncontrado), 1)
    fs.writeFileSync('carrito.json', JSON.stringify(lecturaParseada), 'utf-8')
    res.json({ exito: "producto elminado" })
})

//-------------------------------------

app.listen(PORT, (req, res) => {
    console.log("server ok en", PORT);
}) 
