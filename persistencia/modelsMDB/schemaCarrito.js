const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const schemaItem = new mongoose.Schema({
  _id: { type: Schema.ObjectId, ref: 'items' },
  nombre: { type: String, require: true},
  cantidad: { type: Number, require: true, min:0},
  precio: { type: Number, required: true, max: 20000 },
})


const schemaCart = new mongoose.Schema({
  items:  [schemaItem],
//    items: {
//     nombre: {type: String, required: true},
//     cantidad: { type: Number, required: true}
// },
  email: { type: String, required: true, max: 100 },
  
  inCart: { type: Boolean, default:false, required: false},
  total: { type: Number, required: false, },
  fecha: { type: String, required: true },
  direccion: { type: String, required: false },

});

module.exports = mongoose.model('Carrito', schemaCart);