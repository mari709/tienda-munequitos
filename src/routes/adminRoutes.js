const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadFiles');
const authentication = require('../../authentication');

const {
    adminView,
    createView,
    createItem,
    editView,
    editItem,
    deleteItem
} = require('../controllers/adminController');

router.get('/', authentication.ensureAuthenticated, adminView);
router.get('/create', authentication.ensureAuthenticated, createView);
router.post('/create', upload.array('images',2), createItem);
router.get('/edit/:id', authentication.ensureAuthenticated, editView);
router.put('/edit/:id', upload.array('images',2), editItem);
router.delete('/delete/:id', deleteItem);


module.exports = router;

