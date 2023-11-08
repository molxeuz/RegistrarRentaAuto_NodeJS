// Automoviles

const express = require('express');
const Automovil = require('../Models/Automovil');
const RouteAutomovil = express.Router();
let ListaAutomovilesArray = [];
RouteAutomovil.get('/', async (req, res) => {
    try {
      const automoviles = await Automovil.find();
      res.render('AutomovilView', { automoviles }); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al agarrar los datos');
    }
});
RouteAutomovil.post('/', async (req, res) => {
    try {
        const automovil = await Automovil.findOne({ numeroplaca: req.body.numeroplaca });
        const placaPattern = /^[A-Z]{3}\d{3}$/; 
        if (automovil != null) {
            res.render('AutomovilView', { message: "El automóvil ya existe en la base de datos", error: false });
        } else if (!placaPattern.test(req.body.numeroplaca) || req.body.numeroplaca.length !== 6){
            res.render('AutomovilView', { message: 'Formato de número de placa incorrecto', error: false });
            return;
        } else {
            const NuevoAutomovil = new Automovil(req.body);
            await NuevoAutomovil.save();
            ListaAutomovilesArray.push(NuevoAutomovil);
            res.render('AutomovilView', { message: "El automóvil ha sido registrado exitosamente", error: true, automoviles: ListaAutomovilesArray });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Un error ha sido detectado en el servidor');
    }
});
module.exports = RouteAutomovil;