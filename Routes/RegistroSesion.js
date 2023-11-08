// RegistroSesion

const express = require('express');
const Usuario = require('../Models/Usuario');
const RouteRegistro = express.Router();
RouteRegistro.get('/', (req, res) => {
    res.render('RegistroSesionView', { message: "", error: false });
});
RouteRegistro.post('/', async (req, res) => {
    try {
        const usuarioExistente = await Usuario.findOne({ usuario: req.body.usuario });
        if (usuarioExistente) {
            res.render('RegistroSesionView', { message: "Usuario ya existente", error: false });
        } else if (req.body.usuario === req.body.nombre) {
            res.render('RegistroSesionView', { message: "El nombre de usuario no puede ser igual al nombre", error: false });
        } else {
            const nuevoUsuario = new Usuario(req.body);
            await nuevoUsuario.save();
            res.render('RegistroSesionView', { message: "Usuario registrado con éxito", error: true });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
    }
});
module.exports = RouteRegistro;