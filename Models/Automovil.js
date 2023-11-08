const mongoose = require('mongoose');
const AutomovilSchema = new mongoose.Schema({
    numeroplaca: String, 
    marca: String,
    disponibilidad: String,
});
module.exports = mongoose.model('automovil', AutomovilSchema);