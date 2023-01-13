const mongoose = require('mongoose');
 var Schema = mongoose.Schema;



 const schemaItem = new mongoose.Schema({
    _id: { type: Schema.ObjectId, ref: 'items' },
    nombre: { type: String, require: true},
    cantidad: { type: Number, require: true, min:0}
})


const schemaOrdenes = new mongoose.Schema({

    items:  [schemaItem],
    //      nombre: [{ type: Object, require: true}],
    //     cantidad: [{ type: Object, require: true}]
    // },
    numeroOrden: { type: Number, required: true },
    estado: { type: String, required: true },
    email: { type: String, required: true },
    time: {type: String, require: false},
    direccion: { type: String, required: true },
})
module.exports = mongoose.model('Ordenes', schemaOrdenes); 

