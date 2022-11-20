class ProductosApi {
    constructor () {
        this.productos = []
    }

    mostrarTodos() {
        return this.productos
    }

    eliminarTodos() {
        this.productos = []
    }
    eliminarPorId(id) {

    }

    guardarProducto(prod) {
        this.productos.push({ ...prod, id: this.productos.length + 1 })
    }
}

module.exports = ProductosApi