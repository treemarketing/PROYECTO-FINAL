const mongoose = require("mongoose");


const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  email: { type: String, required: true, unique:true, max: 100 },
  address: { type: String, required: true, max: 100 },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  avatar: { type: String, required: true },
  isAdmin: { type: Boolean, required: true }
});

const Usuarios = mongoose.model("usuarios", usuarioSchema);
module.exports = Usuarios;