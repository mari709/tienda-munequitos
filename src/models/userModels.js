const bcrypt = require('bcrypt');
const { conn } = require('../config/conn');

async function createUser(name, lastname, email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    const [rows] = await conn.query('INSERT INTO user (name, lastname, email, password) VALUES (?, ?, ?, ?)', [name, lastname, email, hashedPassword]);
    return rows.insertId;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const [rows] = await conn.query('SELECT * FROM user WHERE email = ?', [email]);
    return rows[0];
  } catch (error) {
    console.error('Error al obtener usuario por correo electrónico:', error);
    throw error;
  }
}

async function comparePassword(inputPassword, hashedPassword) {
  try {
    console.log('Contraseña proporcionada:', inputPassword);
    console.log('Contraseña almacenada (hash):', hashedPassword);
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    console.log('match:', match);
    return match;
  } catch (error) {
    console.error('Error al comparar contraseñas:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  comparePassword,
};