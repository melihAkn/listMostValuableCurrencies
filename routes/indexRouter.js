const indexRouter = require('express').Router();
const indexController = require('../controllers/indexController');


indexRouter.get('/',indexController.index);
indexRouter.get('/degerBul/:baseCurrency',indexController.degerBul);
module.exports =indexRouter; 