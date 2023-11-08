const mongoose = require('mongoose');
const RentaSchema = new mongoose.Schema({
    numerorenta: String,
    numeroplaca: String,
    usuario: String,
    fecharenta: Date,
});
module.exports = mongoose.model('renta', RentaSchema);