const Carrito = require('../controllers/carritoMongo')
const Producto = require('../controllers/productoDaos')

const esquemaCart = require("../persistencia/modelsMDB/schemaCarrito");
const esquemaProduct = require("../persistencia/modelsMDB/schemaProducto");


const express = require('express')
 const { Router } = express
const cartRouter = Router()







  const carrito = new Carrito('carrito')




  //POST DE NUEVO CARRITO CON PRODUCTOS
      cartRouter.post('/', async (req, res) => {
        
        const { nombre, cantidad, precio } = req.body;
        try{
          
          await carrito.agregarProducto(nombre, cantidad)
         res.status(200).send({
          status: 200,
          data:{
                items: {nombre, cantidad, precio},
              },
          message:'Producto Agregado'
        })} catch (error) {
              res.status(500).send({
                  status: 500,
                  message: error.message
              })
            }
          })




//REFACTORIZAR PUT 
cartRouter.put('/:id', async(req, res) => {
  let { idP } = req.params;
  const {query} = req.query;
  const body = req.body;

  const productBuscado = await cart.getCarritoById(idP)


  if (productBuscado){
    body.total = body.total + 1;

    await cart.findByIdAndUpdate(idP, body, {
      new: true,
    }).then((product) => {
      res.json({
        mensaje: `el producto" + ${product.nombre} + "fue actualizado` ,
        product,
      })
    })

  }else if (productBuscado && query === "del"){
    body.total = body.total - 1;

    await await cart.findByIdAndUpdate(idP, body, {
      new: true,
    }).then((product) => {
      res.json({
        mensaje: `el producto" + ${product.nombre} + "fue actualizado` ,
        product,
      })
    })
  }

     })



    //muestra todos los productos que estan dentro del carrito OK
    cartRouter.get("/", async (req, res) => {
   await carrito.getProductsCart().then((respuesta)=>{
      console.log(respuesta)
      if (respuesta) {
        res.json({ respuesta });
      } else {
        res.json({ mensaje: "No hay productos en el carrito" });
      }
    }) 
  }) 




  //DELETE CON ID CARRITO OK
  cartRouter.delete('/:idC', async(req, res) => {
      const { idC } = req.params;
    try{    
 /* Buscamos y eliminamos el producto con la id */
 await carrito.deleteById(idC)
 res.status(200).send({
  status: 200,
  data: {
      idC,
  },
  message:'carrito borrado'
  })
} catch (error) {
res.status(500).send({
  status: 500,
  message: error.message
})
}
})








module.exports = cartRouter;