const mainControllers = {
    home: (req,res) => {
        res.render('index', {
            title: "Home"
        })
    },

    contact: (req,res) => {
        res.render('contact', {
            title: "Contacto"
        })
    },

    about: (req, res) => res.send('Route for about view'),
    faqs: (req, res) => res.send('Route for faqs view')
}

module.exports = mainControllers;