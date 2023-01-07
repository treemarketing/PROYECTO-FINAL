const express = require('express')
const Producto = require('../controllers/productoDaos')



const mensajesRouter = express.Router()








let fecha = new Date()
const product = new Producto("product")


//muestra todos los productos
mensajes.get("/", validacion, (req, res) => {
     product.getAll().then((respuesta)=>{
    res.json(respuesta)
    }) 
})


//GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
mensajesRouter.get('/:id', validacion, async (req, res) => {
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

  
//me estoy quedando con respuesta del 1 ver como hago para pasar todo 
 
productsRouter.post('/',validacion, async (req, res) => {
  try{
  //  const {body} = req;
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
        //  let insertBody = { idP: body._id, fecha: fecha.toLocaleDateString(), nombre: body.nombre, descripcion: body.descripcion, codigo:body.codigo, foto: body.foto, precio: body.precio, stock: body.stock}
        //  await product.save(insertBody).then((respuesta)=>{
        //    res.json(respuesta);




//PUT CON ID PARAMS SIEMPRE y BODY!
productsRouter.put('/:id',validacion, (req, res) => {
  let { id } = req.params;
   console.log(req.body)
   const { idP, nombre, descripcion, codigo, foto, precio, stock } = req.body
   const cambio = { idP, nombre, descripcion, codigo, foto, precio, stock };
     
     product.changeById(id, cambio).then((respuesta)=>{
      console.log(cambio)
       res.json({ sucess: "ok", new: respuesta})
     })
 }) 

 

//ver si tengo que darle cambio en el archivo tambien com

 //DELETE CON ID ESCRIBIENDO EN EL ARCHIVO 
 productsRouter.delete('/:id',validacion, (req, res) => {
   const { id } = req.params;  
     
   product.deleteById(id).then((response) => {
     res.json({ result: response })
   })
 });

 module.exports = productsRouter