const mongoose = require('mongoose');




const schemaMensaje = new mongoose.Schema({
    mail: {type: String, require: true},
    texto: {type: String, require: true},
    tipo: {type: String, require: true},
    pregunta: {type: String, require: true},
    time: {type: String, require: false}

});

module.exports = mongoose.model('Mensaje', schemaMensaje);