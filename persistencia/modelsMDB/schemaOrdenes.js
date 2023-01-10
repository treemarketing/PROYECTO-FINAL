const mongoose = require('mongoose');
// const schemaItem = require('./schemaItem')



const schemaOrdenes = new mongoose.Schema({

    items: [{
        nombre: {type: String, required: true},
        cantidad: { type: Number, required: true}
    }],
    numeroOrden: { type: Number, required: true },
    estado: { type: String, required: true },
    email: { type: String, required: true },
    time: {type: String, require: false},
    direccion: { type: String, required: true },
})
module.exports = mongoose.model('Ordenes', schemaOrdenes);