    //authentication.js
    const isAuthenticated = (req, res, next) => {
        console.log('Middleware de autenticación en acción');

        if (req.session && req.session.isLogged) {
            // El usuario está autenticado
            console.log('Usuario autenticado');
            return next();
        }
        // El usuario no está autenticado, redirige a la página de inicio de sesión
        console.log('Usuario no autenticado. Redirigiendo a la página de inicio de sesión');
        res.redirect('/auth/login');
    };

    module.exports = {
        isAuthenticated,
    };