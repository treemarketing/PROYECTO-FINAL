const mongoose = require('mongoose');




const schemaProducto = new mongoose.Schema({
  nombre: { type: String, required: true, max: 100 },
  descripcion: { type: String, required: true, max: 100 },
  precio: { type: Number, required: true, max: 20000, min: 0 },
  categoria: { type: String, required: true, max: 100 },
  foto: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
  idP: { type: Number, required: true },
  idC: { type: Number, required: false },
  fecha: { type: String, required: true },

});

module.exports = mongoose.model('Producto', schemaProducto);