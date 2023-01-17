const Carrito = require('../controllers/carritoDaos')

const express = require('express')
 const { Router } = express
const cartFireRouter = Router()







  const cart = new Carrito('cart')
  // cart.getAll()


  //POST DE NUEVO CARRITO CON PRODUCTOS
  cartFireRouter.post('/', (req, res) => {
  cart.newCarrito().then((response) =>{
            res.json(response)
        })

});
  


    //muestra todos los productos que estan dentro del carrito OK
    cartFireRouter.get("/", (req, res) => {

    cart.getAll().then((respuesta)=>{
      
      console.log(respuesta)
    res.json(respuesta)
    }) 
  }) 




  //DELETE CON ID CARRITO OK
  cartFireRouter.delete('/:idC', (req, res) => {
    const { idC } = req.params;  
  

    cart.deleteCarritoById(idC).then((response) => {
      res.json({ result: response })
    })
  });


  //GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS OK
  cartFireRouter.get('/:idC/productos', (req, res) => {
  let { idC } = req.params;

  // id = parseInt(id)
  cart.getCarritoById(idC).then((respuesta) => {
    res.json(respuesta);
  });
})



//AGREGO PRODUCTOS AL CARRITO OK

cartFireRouter.post('/:idC/productos', (req, res) => {
  const {idC} = req.params;
  const { body } = req;
  const { nombre, descripcion,categoria, foto, precio, stock } = body
  const insertProducts = { idP: body.idP, nombre, categoria, descripcion, foto, precio, stock };



  cart.agregarProducto(idC, insertProducts).then((response) =>{
             res.json(response)
         })

 });

// BORRO POR ID DE PRODUCTOS OK

cartFireRouter.delete('/:idC/productos/:idP', (req, res) => {
  const { idC, idP } = req.params;  
  let idEncarrito = id; 
  cart.deleteProductoDeCarrito(idC, idP, idEncarrito).then((response) => {
    res.json({ result: response })
  })
});

module.exports = cartFireRouter;