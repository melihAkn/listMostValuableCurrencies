const adminRouter = require('express').Router();
const adminController = require('../controllers/adminController');


adminRouter.get('/getirEkle',adminController.getirEkle);
adminRouter.get('/',adminController.paraBirimiGetir);
module.exports =adminRouter;