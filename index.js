const fs = require('fs').promises

const objeto1 = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
}

const objeto2 = {
    title: 'Calculadora',
    price: 234.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
}

const objeto3 = {
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
}


class Contenedor {

    constructor(nombre) {
        this.nombre = nombre;
    }

    async save(objeto) {
        try {
            const lectura = await fs.readFile(this.nombre, "utf-8")
            const lecturaParseada = JSON.parse(lectura)
            let id = lecturaParseada.length + 1
            const objetoNuevo = { ...objeto, id: id }
            lecturaParseada.push(objetoNuevo)
            fs.writeFile(this.nombre, JSON.stringify(lecturaParseada), "utf-8")
            return id
        }
        catch (error) {
            throw new error
        }
    }

    async getById(id) {
        const lectura = await fs.readFile(this.nombre, "utf-8")
        const lecturaParseada = JSON.parse(lectura)
        const objEncontrado = lecturaParseada.find(i => i.id === id)
        objEncontrado ? console.log(objEncontrado) : console.log(null);
    }

    async getAll() {
        try {
            const lectura = await fs.readFile(this.nombre, "utf-8")
            console.log(lectura)
        }
        catch (error) {
            throw new Error
        }
    }

    async deleteById(id) {
        try {
            const lectura = await fs.readFile(this.nombre, "utf-8")
            const lecturaParseada = JSON.parse(lectura)
            const newLectura = lecturaParseada.filter(i => i.id != id)
            fs.writeFile(this.nombre, JSON.stringify(newLectura), "utf-8")
        }
        catch (error) {
            throw new error
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.nombre, JSON.stringify([]), "utf-8")
        }
        catch (error) {
            throw new error
        }
    }
}

const contenedor1 = new Contenedor('./productos.txt')

async function ejecutarPrograma() {
    //Ejecutar programa con metodos de la clase
}

ejecutarPrograma()



