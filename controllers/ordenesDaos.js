
const mongoose = require('mongoose');
const esquemaOrdenes = require('../persistencia/modelsMDB/schemaOrdenes')
const enviarEmailCompra = require('../controllers/email')

  const {MONGOURL} = require("../config")
 




class Ordenes{
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

async newOrden(pedido){
    let tiempo = new Date()
    const orden = {pedido}
    await this.connectMDB()
    const nOrdenes = await esquemaOrdenes.countDocuments()
    try{
        
        
         orden.time = tiempo.toString()
         orden.estado = "generada"
         orden.email = pedido.email
         orden.direccion = pedido.direccion
         orden.numeroOrden = nOrdenes + 1
         console.log(orden)
        await esquemaOrdenes.create(orden)
        mongoose.disconnect()
        return orden
    }catch (error){
        throw Error(error.message)
    }
}




async enviarOrdenes(email){
    try{
        await this.connectMDB()
        const nOrdenes = await esquemaOrdenes.find({email: email})
        // mongoose.disconnect()
        return nOrdenes

    }catch (error){
        throw Error(error.message)
}
}

async getAll(){
    try{
        await this.connectMDB()
        const ordenEncontrada = await esquemaOrdenes.find({})
        // mongoose.disconnect()
        // const nOrdenes = await esquemaOrdenes.countDocuments()
        return ordenEncontrada

    }catch (error){
        throw Error(error.message)
}
}


async deleteById(id){
    try{
        await this.connectMDB()
        const borrar = await esquemaOrdenes.deleteOne({_id: String(id)})
        mongoose.disconnect()
        return borrar
    }catch (error){
        throw Error(error.message)
}
}





}

module.exports = Ordenes