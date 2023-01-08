import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Button, CardBody, CardTitle, CardText, Card, CardImg, CardGroup } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'; 

import io from 'socket.io-client'


function App() {

  let ENDPOINT_PRODUCTOS = 'http://localhost:8080/api/productos/'
  let ENDPOINT_MENSAJES = 'http://localhost:8080/api/mensajes/'

  const socket = io('http://localhost:8080')
//socket io 
const [mensajes, setMensajes] = useState([]);


  const [productos, setProductos] = useState([]);
  const [id, setId] = useState("");
  const [idP, setIdP] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [foto, setFoto] = useState("");
 
   function cargarProductos() {
     fetch(ENDPOINT_PRODUCTOS)
    .then((response) => response.json())
    .then((json) => setProductos(json))

  }
  
  function cargarMensajes() {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(ENDPOINT_MENSAJES, requestOptions)
      .then((response) => response.json())
      .then((result) => setMensajes(result))
      .catch(error => console.log('error', error));
    }


  useEffect(() => {
    cargarProductos();
   
      //ver .que hay que devolverlo
  },[]);
  

  function handleBorrar(_id){
    fetch(ENDPOINT_PRODUCTOS + _id,{
      method: 'DELETE',
    })
      .then(response => response.text())
      .then((result) => {
        cargarProductos()
        console.log(result)
      }) 
      .catch(error => console.log('error', error));
      
  }


  function handleNuevo(_id){
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

   let raw = JSON.stringify({ nombre, descripcion, precio, stock, foto, idP})
   let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(ENDPOINT_PRODUCTOS, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    cargarProductos()
    .catch(error => console.log('error', error));
  }


  function handleSetProperties(prod){
    setId(prod._id)
    setIdP(prod.idP)
setNombre(prod.nombre)
setDescripcion(prod.descripcion)
setPrecio(prod.precio)
setStock(prod.stock)
setFoto(prod.foto)
  }

  function handleEditar(){
 
   var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let raw = JSON.stringify({ nombre, descripcion, precio, stock, foto, idP});

let requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(ENDPOINT_PRODUCTOS + id, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  cargarProductos()
  }





  return (

      <div className="App">
<div className="container"> 
<div className="card"> 
<div className="card-body">
<h5 className="text-center">CHAT</h5>

<form>
<div className="d-flex mb-3">
<input type="text" className="form-control" placeholder="nickname" id="nickname"></input>
<button className='btn btn-success mx-3' type="submit" id="btn-nickname">Establecer</button>
</div>

</form>

<form>
<div className="d-flex">
<input type="text" className="form-control" placeholder="mensaje" id="texto"></input>
<button className='btn btn-success mx-3' type="submit" id="btn-texto">Enviar</button>
</div>

</form>

<div className='card mt-3 mb-3' id="content-chat">
    <div className='card-body'>


    </div>

</div>

</div>
</div>
 </div>



<button onClick={() => setId("")}>+</button>

      {productos.length > 0 && productos.map((prod) => (
      <div key={prod._id}>
  <CardGroup>
  <Card    color="light"
  style={{
  width: '18rem'
  }}>
  <CardBody>
  <CardImg style ={{width: "10%", align:"center"}}  src={ prod.foto} alt="foto"/>
    <CardText as="h5">id Producto { prod.idP }</CardText>
  <CardTitle as="h5">Nombre: { prod.nombre}</CardTitle>
    <CardText as="h5">{ prod.descripcion }</CardText>
    <CardText as="h5">Precio: $ { prod.precio }</CardText>
    <CardText as="h5">Codigo: { prod.codigo}</CardText>
    <CardText as="h5">Stock { prod.stock }</CardText>
    <CardText as="h5">Fecha: { prod.fecha }</CardText>
  </CardBody>
 
</Card>    
</CardGroup>
<hr />
  <Button size="lg" onClick={()=> handleBorrar(prod._id)}> borrar </Button> 
  
  <Button size="lg" onClick={()=> handleSetProperties(prod)}> Editar </Button> 
      </div>
      ))}

      
         <div>
        {id ? "EDITANDO " + id : "INGRESE UNO NUEVO"}
        <br />
        <input
          value={idP}
          onChange={(e) => setIdP(e.target.value)}
          placeholder="id Producto"
        />
        <br />
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="nombre"
        />
        <br />
        <input
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="descripcion"
        />
        <br />
        <input
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="precio"
        />
        <br />
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="stock"
        />
        <br />
        <input
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
          placeholder="foto"
        />
      </div>

      {!id && <button onClick={handleNuevo}>Nuevo</button>}
      {id && <button onClick={handleEditar}>Editar</button>}
    </div>


  );
}




export default App;
