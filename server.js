const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const app = express()
const cors = require('cors')






  //es similar a utilizar el package cors
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });

  //socket io
  const httpServer = createServer(app)
  const io = new Server(httpServer, {
    cors:{
        origin:'*'
    }
  })

 

 

//ENV 


const {TIPO_PERSISTENCIA, PORT, NODE_ENV, MONGOURL} = require("./config")
//termino uso de ENV



//linea de configuracion ejs 
app.set('view engine', 'ejs');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//defino lugar donde se van a poder ver los archivos 
app.use('/public', express.static(__dirname + '/public'));


// io.on('connection', (socket) => {
//   console.log("llega?")
// console.log(socket.id)
// })




//RUTAS DE ROUTER CON FILE SYSTEM

   const productsRouterFile = require('./routers/productosFile')
  const ordenesRouter= require('./routers/ordenes')
  const mensajesRouter= require('./routers/chat.js')
  const productsRouter = require('./routers/productosMongo')
   const cartFireRouter = require('./routers/carritoFirebase')
  const cartRouter = require('./routers/carritoMongo')
  const loginRouter = require('./routers/login')
  const infoRouter = require('./routers/info')
  const randomRouter = require('./routers/random');


  async function persistencia() {
    if (TIPO_PERSISTENCIA == "Mongo-DB"){
    app.use('/api/productos', productsRouter)

  }else{
    app.use('/api/productos', productsRouterFile)
  }
}
persistencia()

app.use('/api/carrito', cartFireRouter)
app.use('/api/carritomongo', cartRouter)
app.use('/api/', loginRouter)
app.use('/', infoRouter)
app.use('/api', randomRouter)
app.use('/api/mensajes', mensajesRouter)
app.use('/api/ordenes', ordenesRouter)


io.sockets.on('connection', (socket) => {
  // console.log('se conecto un usuario' + socket.id)


  socket.on('mensaje', (message, nickname)=>{
    socket.broadcast.emit('message', {
      body: message,
      from: nickname
    })
  })

})



//control de direccion de error de paginas
app.get("*", (req, res, next) =>{
  const url = req.originalUrl;
    res.status(404).send({error: "-2", descripcion: "ruta" + url + " no autorizada"})
    next()
})


httpServer.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT} (${NODE_ENV} - ${TIPO_PERSISTENCIA})`
  )
})


httpServer.on("error", error => console.log(`Error en servidor ${error}`)) 





  