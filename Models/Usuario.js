const mongoose = require('mongoose');
const UsarioSchema = new mongoose.Schema({
    usuario: String,
    nombre: String,
    contraseña: String,
});
module.exports = mongoose.model('usuario', UsarioSchema);