// ListaAutomovil

const express = require('express');
const Automovil = require('../Models/Automovil');
const RouteListaAutomovil = express.Router();
RouteListaAutomovil.get('/', async (req, res) => {
    try {
      const automoviles = await Automovil.find();
      res.render('ListaAutomovilView', { automoviles });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en encontrar datos del automovil');
    }
});
module.exports = RouteListaAutomovil;