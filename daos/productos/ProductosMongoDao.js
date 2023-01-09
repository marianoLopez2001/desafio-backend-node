import ContenedorMongo from "../../contenedores/contenedorMongo.js";

class ProductosDaoMongo extends ContenedorMongo {

    constructor() {
        super('productos', {
            title: { type: String, required: true },
            price: { type: Number, required: true },
        })
    }
}

export default ProductosDaoMongo