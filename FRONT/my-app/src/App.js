
import './App.css';
import { useState, useEffect } from 'react';

import { CartProvider } from './components/context/cartContext';


import 'bootstrap/dist/css/bootstrap.min.css'; 

import io from 'socket.io-client';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';



function App() {


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

<CartProvider>
    
<>
<Header/>
<ProductList/>
</>


</CartProvider>
</div>


      



  );
}




export default App;
