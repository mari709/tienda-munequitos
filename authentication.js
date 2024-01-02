const path = require('path');


const ensureAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        // Guarda la URL actual en la sesión para que puedas redirigir después del inicio de sesión
        req.session.returnTo = req.originalUrl;
        res.redirect('/auth/login'); // Cambia '/admin/login' por la ruta de tu pantalla de inicio de sesión
    }
};

module.exports = { ensureAuthenticated };
