// ListaRenta

const express = require('express');
const moment = require('moment');
const Renta = require('../Models/Renta');
const RouteListaRenta = express.Router();
RouteListaRenta.get('/', async (req, res) => {
    try {
      const rentas = await Renta.find();
      res.render('ListaRentaView', { rentas, moment });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al agarrar los datos');
    }
});
module.exports = RouteListaRenta;