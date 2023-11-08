// InicioSesion

const express = require('express');
const Usuario = require('../Models/Usuario');
const RouteInicioSesion = express.Router();
RouteInicioSesion.get('/', (req, res) => {
    res.render('InicioSesionView', { message: '', error: false });
});
RouteInicioSesion.post('/', async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ usuario: req.body.usuario });
        if (usuario == null) {
            res.render('InicioSesionView', { message: "El usuario no existe", error: false });
        } else {
            if (usuario.contraseña === req.body.contraseña) {
                res.render('MenuView');
            } else {
                res.render('InicioSesionView', { message: "Contraseña incorrecta", error: false });
            }
        }
    } catch (error) {
        console.error(error);
        res.render('InicioSesionView', { message: "Ha ocurrido un error", error: true });
    }
});
module.exports = RouteInicioSesion;