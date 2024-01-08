const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadFiles');
const { isAuthenticated } = require('../../authentication');

const {
    adminView,
    createView,
    createItem,
    editView,
    editItem,
    deleteItem
} = require('../controllers/adminController');

router.get('/', isAuthenticated, adminView);
router.get('/create', isAuthenticated, createView);
router.post('/create', upload.array('images',2), createItem);
router.get('/edit/:id', isAuthenticated, editView);
router.put('/edit/:id', upload.array('images',2), editItem);
router.delete('/delete/:id', deleteItem);


module.exports = router;

