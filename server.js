const express = require('express')
const app = express()




  //es similar a utilizar el package cors
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });
  
//ENV 


const {TIPO_PERSISTENCIA, PORT, NODE_ENV, MONGOURL} = require("./config")
//termino uso de ENV



//linea de configuracion ejs 
app.set('view engine', 'ejs');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//defino lugar donde se van a poder ver los archivos 
app.use('/public', express.static(__dirname + '/public'));



const server = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT} (${NODE_ENV} - ${TIPO_PERSISTENCIA})`
  )
})

server.on("error", error => console.log(`Error en servidor ${error}`)) 



//RUTAS DE ROUTER CON FILE SYSTEM

   const productsRouterFile = require('./routers/productosFile')




  const productsRouter = require('./routers/productosMongo')
  const cartRouter = require('./routers/carritoFirebase')
  const loginRouter = require('./routers/login')
  const infoRouter = require('./routers/info')
  const randomRouter = require('./routers/random')

  async function persistencia() {
    if (TIPO_PERSISTENCIA == "Mongo-DB"){
    app.use('/api/productos', productsRouter)

  }else{
    app.use('/api/productos', productsRouterFile)
  }
}
persistencia()

app.use('/api/carrito', cartRouter)
app.use('/api/', loginRouter)
app.use('/', infoRouter)
app.use('/api', randomRouter)

//control de direccion de error de paginas
app.get("*", (req, res, next) =>{
  const url = req.originalUrl;
    res.status(404).send({error: "-2", descripcion: "ruta" + url + " no autorizada"})
    next()
})








  