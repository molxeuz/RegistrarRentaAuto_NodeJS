
const express = require("express");
const morgan = require('morgan');
require('dotenv').config();

const Automoviles = require('./Routes/Automoviles');
const ListaAutomovil = require('./Routes/ListaAutomovil');
const Rentas = require('./Routes/Rentas');
const ListaRenta = require('./Routes/ListaRenta');
const RegistroSesion = require('./Routes/RegistroSesion');
const InicioSesion = require('./Routes/InicioSesion');

const port = process.env.PORT || 3500;

const app = express();

const mongoose = require('./DataBase/database');

app.set('view engine', 'pug');
app.set('Views', 'Views');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('Public'));

app.use('/AutomovilView', Automoviles);
app.use('/ListaAutomovilView', ListaAutomovil);
app.use('/RentaView', Rentas);
app.use('/ListaRentaView', ListaRenta);
app.use('/RegistroSesionView', RegistroSesion);
app.use('/InicioSesionView', InicioSesion);

app.use(morgan('dev'));

app.get("/MenuView", (req, res)=>{
    res.render('MenuView');
})
app.get("/InicioSesionView", (req, res)=>{
    res.render('InicioSesionView');
})
app.get("/RegistroSesionView", (req, res)=>{
    res.render('RegistroSesionView');
})

app.listen(port, () => {
    console.log(`--> El servidor en: http://localhost:${port}`);
})