import admin from "firebase-admin";
import config from "../config/config.js";

const serviceAccount = config.firebase

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: config.firebase.dbUrl
    });
    console.log('Firebase conectado');
} catch (err) { console.log(err); }

const db = admin.firestore();

class ContenedorFirebase {

    constructor(nombreColeccion, docName) {
        this.coleccion = db.collection(nombreColeccion)
        this.docName = docName
    }

    async insert(data) {
        try {
            let doc = this.coleccion.doc(`${this.docName}`)
            await doc.create(data)
        } catch (err) {
            console.log(err);
        }
    }

    async listAll() {
        try {
            const col = await this.coleccion.get()
            let docs = col.docs
            const res = docs.map(i => ({
                title: i.data().title,
                price: i.data().price,
            }))
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    async listById(id) {
        try {
            const doc = this.coleccion.doc(`${id}`)
            const item = await doc.get()
            const res = item.data()
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id) {
        try {
            const doc = this.coleccion.doc(`${id}`)
            const item = await doc.update({ title: 'actualizado' })
            console.log('exito');
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const doc = this.coleccion.doc(`${id}`)
            await doc.delete()
            console.log('eliminado');
        } catch (error) {
            console.log(error);
        }
    }
}

export default ContenedorFirebase
