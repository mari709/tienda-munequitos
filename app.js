//importar modulos
const express = require('express');
const session = require('express-session');
//const bcrypt = require('bcrypt');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

// Configuración de express-session
app.use(session({
  secret: 'miSecretKey', 
  resave: false,
  saveUninitialized: true
}));

// Middleware para parsear datos de formularios y peticiones JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración del motor de vistas y ubicación de las vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

// Middleware para sobrescribir el método HTTP (para PUT y DELETE)
app.use(methodOverride('_method'));

// Middleware para servir archivos estáticos
app.use(express.static('public_html'));

//importar rutas
const mainRoutes = require('./src/routes/mainRoutes');
const shopRoutes = require('./src/routes/shopRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Configuración de las rutas
app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

// Middleware para manejar errores 404 (Not Found)
app.use((req, res, next) => {
  res.status(404).send('Página no encontrada');
});

// Middleware para el manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal status 500');
});

// Configuración del puerto y arranque del servidor
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));