const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadFiles');


/*const adminControllers = require('../controllers/adminController');*/
const {
    adminView,
    createView,
    createItem,
    editView,
    editItem,
    deleteItem
} = require('../controllers/adminController');


router.get('/', adminView);
router.get('/create', createView);
router.post('/create', upload.array('images',2), createItem);/* ambos inputs con el mismo name*/
router.get('/edit/:id', editView);
router.put('/edit/:id', upload.array('images',2), editItem);
router.delete('/delete/:id', deleteItem);


module.exports = router;

