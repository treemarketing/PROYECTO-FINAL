const express = require('express')
const Ordenes = require('../controllers/ordenesDaos')
const { Router } = express

const ordenesRouter = express.Router()





let fecha = new Date()
const ordenes = new Ordenes("ordenes")


//muestra todas las ordenes
ordenesRouter.get("/",  (req, res) => {
     ordenes.getAll().then((ordenes)=>{
    // res.json(respuesta)
    
    console.log(ordenes)
    res.render("pages/ordenes", {ordenes });
    }) 
})


ordenesRouter.post("/enviar/:email",  (req, res) => {
  let { email } = req.params;
     ordenes.enviarOrdenes(email).then((respuesta)=>{
    res.json(respuesta)
    }) 
})


//GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
ordenesRouter.get('/:id', async (req, res) => {
   let { id } = req.params;
   await ordenes.getById(id).then((respuesta)=>{
     const encontrar = respuesta
     
     if (encontrar){
         res.json(encontrar)
     }else{
     res.json({error: "orden encontrada"})
     }
   });
   })


   
  

  

 
ordenesRouter.post('/', async (req, res) => {
  try{
 
   const orden = await ordenes.newOrden(req.body)
   res.status(200).send({
    status: 200,
    data: {
        orden
    },
    message:'orden creada'
    })} catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
      }
    })


 



 //DELETE CON ID ESCRIBIENDO EN EL ARCHIVO 
 ordenesRouter.delete('/:id', (req, res) => {
   const { id } = req.params;  
     
   ordenes.deleteById(id).then((response) => {
     res.json({ result: response })
   })
 });

 module.exports = ordenesRouter