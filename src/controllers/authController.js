const path = require('path');

module.exports = {
    loginView:  (req, res) => {
        res.render(path.resolve(__dirname, '../views/auth/login.ejs'),
        {
            title: "Iniciar sesión"
        })
    },
    
    loginUser:  (req, res) => res.send('Login Route that receive the data when user click login button - validation'),
    
    registerView:  (req, res) => {
        res.render(path.resolve(__dirname, '../views/auth/register.ejs'),
        {
           title: "Registro" 
        }
        )
    },

    registerUser:  (req, res) => res.send('Register Route that receive the data when user click register button - create new user'),
    Logout: (req,res) => res.send("logout")
}

