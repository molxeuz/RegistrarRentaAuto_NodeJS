// Rentas

const express = require('express');
const Usuario = require('../Models/Usuario')
const Automovil = require('../Models/Automovil');
const Renta = require('../Models/Renta')
const RouteRenta = express.Router();
let ListaRenta = [];
RouteRenta.get('/', async (req, res) => {
    try {
      const rentas = await Renta.find();
      res.render('RentaView', { rentas });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al agarrar los datos');
    }
});
RouteRenta.post('/', async (req, res) => {
    try {
        const RentaExistente = await Renta.findOne({ numerorenta: req.body.numerorenta });
        if (RentaExistente) {
            res.render('RentaView', { message: 'Numero de renta ya existe', error: false});
            return;
        }
        const automovil = await Automovil.findOne({ numeroplaca: req.body.numeroplaca });
        if (!automovil) {
            res.render('RentaView', { message: 'Numero de placa no existente', error: false });
            return;
        }
        const usuario = await Usuario.findOne({ usuario: req.body.usuario });
        if (!usuario) {
            res.render('RentaView', { message: 'Usuario no existente', error: false });
            return;
        }
        if (automovil.disponibilidad !== 'disponible') {
            res.render('RentaView', { message: 'Automovil no disponible', error: false });
            return;
        }
        automovil.disponibilidad = 'no disponible';
        await automovil.save();
        const Nuevarenta = new Renta(req.body);
        await Nuevarenta.save();
        ListaRenta.push(Nuevarenta);
        res.render('RentaView', { message: 'Renta registrada exitosamente', error: true, rents: ListaRenta });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error del servidor');
    }
});
module.exports = RouteRenta;