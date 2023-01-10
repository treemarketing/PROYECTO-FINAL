const Products = require('../persistencia/bd/product')
const express = require('express')
const { Router } = express

const productsRouterFile = Router()





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
const product = new Products ("product")
//muestra todos los productos
productsRouterFile.get("/", validacion, async (req, res) => {
    await product.getAll().then((respuesta)=>{
     
    res.json(respuesta)
    }) 
    
})


//GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
productsRouterFile.get('/:id', validacion, async (req, res) => {
   let { id } = req.params;
   // id = parseInt(id)
   await product.findOne(id).then((respuesta)=>{
     const encontrar = respuesta
     
     if (encontrar){
         res.json(encontrar)
     }else{
     res.json({error: "producto no encontrado"})
     }
   });
   })

 
productsRouterFile.post('/',validacion, async (req, res) => {
   const {body} = req;
         console.log(body)
         let insertBody = {fecha: fecha.toLocaleDateString(), nombre: body.nombre, descripcion: body.descripcion, categoria: body.categoria, codigo:body.codigo, foto: body.foto, precio: body.precio, stock: body.stock}
         await product.save(insertBody).then((respuesta)=>{
           res.json(respuesta);
 });
})


//PUT CON ID PARAMS 
productsRouterFile.put('/:id',validacion, (req, res) => {
   const { id } = req.params;
   const { body } = req;
   const { nombre, descripcion, categoria, codigo, foto, precio, stock } = body
   console.log(body.id)
   const p = { id, nombre, descripcion, categoria, codigo, foto, precio, stock };
     
     product.update(p).then((respuesta)=>{

       res.json({ sucess: "ok", new: respuesta})
     })
 }) 




 //DELETE CON ID 
 productsRouterFile.delete('/:id',validacion, (req, res) => {
   const { id } = req.params;  
  
   product.delete(id).then((response) => {
     res.json({ result: response })
   })
 });

 module.exports = productsRouterFile