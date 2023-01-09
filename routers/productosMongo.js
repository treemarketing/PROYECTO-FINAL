const express = require('express')
const Producto = require('../controllers/productoDaos')
const { Router } = express

const productsRouter = express.Router()





function validacion (req, res, next) {
      let admin = true;
      if(!admin){
        return res.status(403).send({error: "acceso no autorizado"})
        }else{
          console.log("acceso autorizado")
          return next();
        }
       }



let fecha = new Date()
const product = new Producto("product")


//muestra todos los productos
productsRouter.get("/", validacion, (req, res) => {
     product.getAll().then((respuesta)=>{
    res.json(respuesta)
    }) 
})


//GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
productsRouter.get('/:id', validacion, async (req, res) => {
   let { id } = req.params;
   await product.getById(id).then((respuesta)=>{
     const encontrar = respuesta
     
     if (encontrar){
         res.json(encontrar)
     }else{
     res.json({error: "producto no encontrado"})
     }
   });
   })

productsRouter.get('/categoria/:categoria', validacion, async (req, res) => {
   let { categoria } = req.params;
   await product.getByCategoria(categoria).then((respuesta)=>{
     const encontrar = respuesta
     
     if (encontrar){
         res.json(encontrar)
     }else{
     res.json({error: "producto no encontrado"})
     }
   });
   })

  

 
productsRouter.post('/',validacion, async (req, res) => {
  try{
 
   const id = await product.save(req.body)
   res.status(200).send({
    status: 200,
    data: {
        id,
    },
    message:'producto agregado'
    })} catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
      }
    })




//PUT CON ID PARAMS SIEMPRE y BODY!
productsRouter.put('/:id',validacion, (req, res) => {
  let { id } = req.params;
   console.log(req.body)
   const { idP, nombre, descripcion, categoria, codigo, foto, precio, stock } = req.body
   const cambio = { idP, nombre, descripcion, categoria, codigo, foto, precio, stock };
     
     product.changeById(id, cambio).then((respuesta)=>{
      console.log(cambio)
       res.json({ sucess: "ok", new: respuesta})
     })
 }) 

 



 //DELETE CON ID ESCRIBIENDO EN EL ARCHIVO 
 productsRouter.delete('/:id',validacion, (req, res) => {
   const { id } = req.params;  
     
   product.deleteById(id).then((response) => {
     res.json({ result: response })
   })
 });

 module.exports = productsRouter