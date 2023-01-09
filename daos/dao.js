let instanciaProductosDao
let instanciaCarritoDao

let DB = 'firebase'

if (DB === 'mongo') {
    const { default: ProductosMongoDao } = await import("./productos/ProductosMongoDao.js")
    const { default: CarritoMongoDao } = await import("./carritos/CarritoMongoDao.js")
    instanciaCarritoDao = new CarritoMongoDao()
    instanciaProductosDao = new ProductosMongoDao()
} else if (DB === 'firebase') {
    const { default: ProductosFirebaseDao } = await import("./productos/ProductosFirebaseDao.js")
    const { default: CarritoFirebaseDao } = await import("./carritos/CarritoFirebaseDao.js")
    instanciaCarritoDao = new CarritoFirebaseDao()
    instanciaProductosDao = new ProductosFirebaseDao()
}

export { instanciaProductosDao, instanciaCarritoDao }