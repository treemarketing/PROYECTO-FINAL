
const mongoose = require('mongoose');
const esquemaCart = require('../persistencia/modelsMDB/schemaCarrito')

const Producto = require("./productoDaos")
const esquemaProduct = require('../persistencia/modelsMDB/schemaProducto')

const {MONGOURL} = require("../config")




const Productos = new Producto()

class Carrito{
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
  async getProductsCart(){
    
    try{
      await this.connectMDB()
      const productsCart = await esquemaCart.find({})
      return productsCart
        
      }catch (error){
        throw Error(error.message)
    }
    }



  async agregarProducto(nombre, cantidad, _id) {
    //  const newCart = {carrito}
    await this.connectMDB()
    let tiempo = new Date();

    try{
        
       /* Nos fijamos si el producto ya esta en el carrito */
   const estaEnElCarrito = await esquemaCart.findOne({nombre });
   
      if (!estaEnElCarrito){

        const newCart = {
          items:[ {nombre: nombre,
           cantidad: cantidad,
           precio: 5000}],
           email: "siempre@hotmail.com",
           fecha: tiempo,
           direccion: "siempre linda 100",
           inCart: true
       }
       
   
         await esquemaCart.create(newCart)
         return newCart

      }else if(estaEnElCarrito){
        const id = estaEnElCarrito._id 
      
        await esquemaCart.findByIdAndUpdate(id,
         { 
          items:[ {
            cantidad: cantidad + 1,
            }],
          } 
        )
      }
    }catch (error){
      throw Error(error.message)
  }
  }
 
  async deleteById(idC){
    try{
        await this.connectMDB()
        const borrar = await esquemaCart.deleteOne({_id: String(idC)})
        mongoose.disconnect()
        return borrar
    }catch (error){
        throw Error(error.message)
}
}


  


   
    }




module.exports = Carrito



