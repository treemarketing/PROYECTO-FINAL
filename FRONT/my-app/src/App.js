import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Button, CardBody, CardTitle, CardText, Card, CardImg, CardGroup } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  let ENDPOINT_PRODUCTOS = 'http://localhost:8080/api/productos/'

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
