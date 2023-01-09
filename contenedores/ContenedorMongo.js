import mongoose from "mongoose";
import config from "../config/config.js";

try {
    mongoose.connect(config.mongo.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('mongo ok');
} catch (error) {
    console.log(error);
}
let connect = mongoose.connection;

class ContenedorMongo {
    constructor(nombreColeccion, esquema) {
        this.schema = new mongoose.Schema(esquema)
        this.coleccion = mongoose.model(nombreColeccion, this.schema) // crea la coleccion de una
    }

    async insert(data) {
        try {
            await connect.collection(this.coleccion.collection.name).insertOne(data)
            // await this.coleccion.insertOne(data)
        } catch (error) {
            console.log(error);
        }
    }

    async listAll() {
        try {
            const read = await this.coleccion.find({})
            console.log(read);
        } catch (error) {
            console.log(error);
        }
    }
    async listById(id) {
        try {
            const read = await this.coleccion.find({ _id: id })
            console.log(read);
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id) {
        try {
            await this.coleccion.updateOne({ _id: id }, { title: "pepe" });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            await this.coleccion.deleteOne({ _id: id })
        } catch (error) {
            console.log(error);
        }
    }
}

export default ContenedorMongo
