const mongoose = require('mongoose');
const schemaMensaje = require('../persistencia/modelsMDB/schemaMensaje')


  const {MONGOURL} = require("../config")
 




class Mensaje{
    async connectMDB() {
        try{
            
            let rta = await mongoose.connect(MONGOURL, {
            useNewUrlParser: true,
            useUniFiedTopology: true
        })
        }catch (e) {
      console.log(e);

    }
}

async save(mensaje){
    try{
        let tiempo = new Date()
        let tipo = "usuario"
        await this.connectMDB()
         mensaje.time = tiempo.toString()
         mensaje.tipo = tipo
        await schemaMensaje.create(mensaje)

        console.log(mensaje)
        mongoose.disconnect()
        return mensaje
    }catch (error){
        throw Error(error.message)
    }
}


async getAll() {
    try{
        await this.connectMDB()
        const msj = await schemaMensaje.find({})
        mongoose.disconnect()
        return msj

    }catch (error){
        throw Error(error.message)
}
}



async getByEmail(email){
    if (mongoose.connection.readyState === 0) {
            await this.connectMDB()
 }
    try{ 
        const message = await schemaMensaje.find({email: email})
        return message

    }catch (error){
        throw Error(error.message)
    }
}
}
module.exports = Mensaje