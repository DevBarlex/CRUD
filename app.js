const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];


app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});


app.post('/usuarios', (req, res) => {
    const { nombre, edad, lugarProcedencia } = req.body;
    const nuevoUsuario = {
        id: usuarios.length + 1,  
        nombre,
        edad,
        lugarProcedencia
    };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});


app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === nombre.toLowerCase());
    
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});


app.put('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const { edad, lugarProcedencia } = req.body;
    const index = usuarios.findIndex(u => u.nombre.toLowerCase() === nombre.toLowerCase());
    
    if (index !== -1) {
        usuarios[index].edad = edad || usuarios[index].edad;
        usuarios[index].lugarProcedencia = lugarProcedencia || usuarios[index].lugarProcedencia;
        res.json(usuarios[index]);
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});


app.delete('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const index = usuarios.findIndex(u => u.nombre.toLowerCase() === nombre.toLowerCase());
    
    if (index !== -1) {
        usuarios = usuarios.filter(u => u.nombre.toLowerCase() !== nombre.toLowerCase());
        res.json({ mensaje: `Usuario ${nombre} eliminado` });
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});


app.listen(3000, () => {
    console.log(`Servidor escuchando por el puerto 3000`);
});

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Street Fighter');
});