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
const [mensajes, setMensajes] = useState('');
const [texto, setTexto] = useState('');
const [mail, setMail] = useState('');
const [tipo, setTipo] = useState('');
const [mensajeAhora, setMensajeAhora] = useState([]);
const [messages, setMessages] = useState([]);
const [primeraCarga, setPrimeraCarga] = useState(false);
const [disabled, setdisabled] = useState(false);

//productos
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
     fetch(ENDPOINT_MENSAJES)
    .then((response) => response.json())
    .then((json) => setMensajes(json))

  }
  
  function enviarMensajes() {
    var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
mail, texto, tipo
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

    fetch(ENDPOINT_MENSAJES, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch(error => console.log('error', error));
    }


  useEffect(() => {
    cargarProductos();
    const mensajeRecibidos = (mensajeAhora) => {
      setMessages([mensajeAhora, ...messages])
    }
    socket.on('message', mensajeRecibidos)

    return () => {
      socket.off('message', mensajeRecibidos)
    }
      //ver .que hay que devolverlo
  },[messages]);
  


  if(!primeraCarga){
    cargarMensajes()
    setPrimeraCarga(true)
  }

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
  .then(result => setMensajes(result))
  .catch(error => console.log('error', error));
  cargarProductos()
  }



const mailSubmit = (e) => {
  e.preventDefault();
  setMail(mail)
  setdisabled(true)
}

const textoSubmit = (e) => {
  e.preventDefault();

  if(mail !== ''){
    socket.emit('message', mensajeAhora, mail, texto)

    const newMessage = {
      texto: texto ,
      mail: mail,
      tipo: 'usuario'
    }
    console.log(newMessage)
    enviarMensajes(newMessage)
    setMessages([newMessage], ...messages)
    setMensajeAhora('')

  }else{
    alert('Para enviar mensaje indique ')
  }

  setMail(mail)
}

  return (

      <div className="App">
<div className="container"> 
<div className="card"> 
<div className="card-body">
<h5 className="text-center">CHAT</h5>

<form onSubmit={mailSubmit}>
<div className="d-flex mb-3">
<input type="text" className="form-control" placeholder="e-mail" id="mail" onChange={(e) => setMail(e.target.value)} disabled={disabled} required></input>
<button className='btn btn-success mx-3' type="submit" id="btn-mail" disabled={disabled}>Establecer</button>
</div>

</form>

<form onSubmit={textoSubmit}>
<div className="d-flex">
<input type="text" className="form-control" placeholder="mensaje" id="texto" onChange={(e) => setTexto(e.target.value)} value={texto}></input>
<button className='btn btn-success mx-3' type="submit" id="btn-texto">Enviar</button>
</div>

</form>

<small className="text-center text-muted">... Mensajes Enviados ahora ...</small>
<div className='card mt-3 mb-3' id="content-chat">
    <div className='card-body'>
    {messages.length > 0 && messages.map((msg, index) => (
      <div key={index} className={`d-flex p-3 ${msg.mail === mail ? "justify-content-end" : "justify-content-start"}`}>
        <div className={`card mb-3 shadow border-1 ${msg.mail === mail? "bg-success bg-opacity-25" : "bg-light"}`}>
        <div className='card-body'></div>
        <small className=''>{msg.tipo} {msg.mail} {msg.texto} </small>
      </div>
      </div>
    ))}
</div>
</div>

<small className="text-center text-muted">... Mensajes guardados ...</small>
<div className='card mt-3 mb-3' id="content-chat">
    <div className='card-body'>
    {mensajes.length > 0 && mensajes.map((msg) => (
      <div key={msg._id} className={`d-flex p-3 ${msg.mail === mail ? "justify-content-end" : "justify-content-start"}`}>
        <div className={`card mb-3 shadow border-1 ${msg.mail === mail? "bg-success bg-opacity-25" : "bg-light"}`}>
        <div className='card-body'></div>
        <small className=''>{msg.tipo} {msg.mail} {msg.texto} </small>
      </div>
      </div>
    ))}


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
