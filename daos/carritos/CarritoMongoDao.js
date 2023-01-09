import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"

class CarritoMongoDao extends ContenedorFirebase {

    constructor() {
        super('Carrito', {
            title: { type: String, required: true },
        })
    }
}

export default CarritoMongoDao