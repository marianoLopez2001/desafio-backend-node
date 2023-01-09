import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js";

class ProductosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('productos', 'nombreDoc3')
    }
}

export default ProductosDaoFirebase