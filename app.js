const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

const mainRoutes = require('./src/routes/mainRoutes');
const shopRoutes = require('./src/routes/shopRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const authRoutes = require('./src/routes/authRoutes');

const port = 4000; //.env


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'./src/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.static('public_html'));


app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);




/*app.get('/ping', (req,res) => res.send('pong'));*/
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));