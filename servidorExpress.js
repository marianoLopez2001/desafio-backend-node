const express = require('express');
const ProductosApi = require("./productosApi")
const handlebars = require('express-handlebars');

const PORT = 8080;
const app = express()

// MIDDLEWARES

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productos = new ProductosApi()
const arrayProductos = productos.mostrarTodos()

//CONFIG DE ENGINE DE HANDLEBARS

app.engine('hbs',
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/pages",
        partialsDir: __dirname + "/views/partials",
    }))

app.set("views", "./views")
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("pages/index", { arrayProductos })
})

app.get("/productos", (req, res) => {
    res.render("pages/productos", { arrayProductos, layout: false })
})

app.post("/productos", (req, res) => {
    productos.guardarProducto(req.body)
    res.redirect("/")
})

const server = app.listen(PORT, () => {
    console.log(`servidor expres desde el puerto: ${PORT}`);
})

server.on("error", error => {
    console.log(error);
})
















































// router.get("/productos", (req, res) => { //RUTA /API/PROUCTOS
//     res.json({ productos, productos })
// })

// router.get("/productos/:id", (req, res) => { //RUTA /API/PROUCTOS/:ID
//     const productoEncontrado = productos.find(i => parseInt(i.id) === parseInt(req.params.id))
//     if (!productoEncontrado) {
//         res.json({ error: "producto no encontrado" })
//     } else {
//         res.json(productoEncontrado)
//     }
// })

// //RUTAS CON METODO POST

// router.post("/productos", (req, res) => {
//     const newObj = req.body
//     productos.push({ ...newObj, id: productos.length + 1 })
//     res.json("recibida")
// })

// //RUTA CON METODO PUT

// router.put("/productos/:id", (req, res) => {
//     const { title, price, thumbnail } = req.body
//     const { id } = req.params
//     productos[parseInt(id - 1)].title = title
//     productos[parseInt(id - 1)].price = price
//     productos[parseInt(id - 1)].thumbnail = thumbnail
//     res.json("producto modificado")
// })

// //RUTA CON METODO DELETE SEGUN EL ID

// router.delete("/productos/:id", (req, res) => {
//     const productoEncontrado = productos.find(i => parseInt(i.id) === parseInt(req.params.id))
//     if (!productoEncontrado) {
//         res.json({ error: "producto no encontrado" })
//     } else {
//         productos.splice(productos.indexOf(productoEncontrado), 1)
//         res.send("Producto eliminado")
//     }
// })






