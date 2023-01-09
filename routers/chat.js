const express = require('express')
const Mensaje = require('../controllers/chatDaos')



const mensajesRouter = express.Router()








let fecha = new Date()
const mensaje = new Mensaje("mensaje")


//muestra todos los productos
mensajesRouter.get("/", (req, res) => {
     mensaje.getAll().then((respuesta)=>{
      if(!respuesta){
        return res.status(404).send({
          status:"error",
        mensaje:"no hay mensajes"
      })
      }
      res.json(respuesta)
      
    }) 
})


//GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
mensajesRouter.get('/:email', async (req, res) => {
   let { email } = req.params;
   await mensaje.getByEmail(email).then((respuesta)=>{
     const encontrar = respuesta
     
     if (encontrar){
         res.json(encontrar)
     }else{
     res.json({error: "producto no encontrado"})
     }
   });
   })

  
//me estoy quedando con respuesta del 1 ver como hago para pasar todo 
 
mensajesRouter.post('/', async (req, res) => {
  try{
 
   const msg = await mensaje.save(req.body)
   res.status(200).send({
    status: 200,
    data: {
        msg,
    },
    message:'mensaje enviado'
    })} catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
      }
    })
      




//PUT CON ID PARAMS SIEMPRE y BODY!
mensajesRouter.put('/:id', (req, res) => {
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
 mensajesRouter.delete('/:id', (req, res) => {
   const { id } = req.params;  
     
   product.deleteById(id).then((response) => {
     res.json({ result: response })
   })
 });

 module.exports = mensajesRouter