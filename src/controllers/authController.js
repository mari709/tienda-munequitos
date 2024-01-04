const path = require('path');
const bcrypt = require('bcrypt');
const { createUser, getUserByEmail, comparePassword } = require('../models/userModels');
/*const { isAuthenticated } = require('../../authentication');*/

/*
async function validatePasswordsMatch(password, repassword) {
    return password === repassword;
}
*/
async function registerNewUser(name, lastname, email, password) {
    const hashedPassword = await bcrypt.hash(password, 5);
    const userId = await createUser(name, lastname, email, hashedPassword);
    return userId;
}

module.exports = {
    loginView: (req, res) => {
        res.render(path.resolve(__dirname, '../views/auth/login.ejs'), {
            title: "Iniciar sesión"
        });
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log('Datos de inicio de sesión:', email, password);

            // Validar si se proporcionaron tanto el nombre de usuario como la contraseña
            if (!email || !password) {
                console.log('Datos incompletos');
                return res.status(400).send('Por favor, proporciona tanto el nombre de usuario como la contraseña.');
            }

            // Obtener el usuario de la base de datos
            const user = await getUserByEmail(email);
            console.log('Usuario obtenido de la base de datos:', user);

            // Verificar si el usuario existe
            if (!user) {
                return res.status(401).send('Credenciales inválidas. El usuario no existe.');
            }

            // Verificar la contraseña
            const passwordMatch = await comparePassword(password, user.password); //revisar porque da false

            console.log('Coincidencia de contraseña:', passwordMatch);

            if (!passwordMatch) {
                console.log('Contraseña incorrecta');
                return res.status(401).send('Credenciales inválidas. La contraseña es incorrecta.'); //revisar
            }
            else {
                // Guardar el ID del usuario en la sesión
                req.session.isLogged = true;
                req.session.userId = user.id;
                console.log('Usuario autenticado con éxito');

                // Redirigir al usuario después de iniciar sesión
                res.redirect('/admin');
            }

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    registerView: (req, res) => {
        res.render(path.resolve(__dirname, '../views/auth/register.ejs'), {
            title: "Registro"
        });
    },

    registerUser: async (req, res) => {
        try {
            const { name, lastname, email, password, repassword } = req.body;

            // Validación de contraseña y recontraseña


            /*
             if (!(await validatePasswordsMatch(password, repassword))) {
                 return res.status(400).send('Las contraseñas no coinciden. Por favor, vuelve a ingresarlas.');
             }
             */

            // Verificar si el usuario ya existe por su correo electrónico
            const existingUser = await getUserByEmail(email);
            if (existingUser) {
                return res.status(400).send('El correo electrónico ya está registrado. Usa la opción iniciar sesión');
            }

            // Crear el nuevo usuario
            const userId = await registerNewUser(name, lastname, email, password);

            console.log(`Usuario registrado con éxito. ID: ${userId}`)
            // res.send(`Usuario registrado con éxito. ID: ${userId}`);

            // Iniciar sesión automáticamente después de registrarse
            req.session.isLogged = true;
            req.session.userId = userId;
            res.redirect('/admin');
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    logout: (req, res) => res.send("logout"),
};