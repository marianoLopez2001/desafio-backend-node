import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"

class CarritoFirebaseDao extends ContenedorFirebase {

    constructor() {
        super('Carrito', 'nombreDoc')
    }
}

export default CarritoFirebaseDao