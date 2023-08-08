//REQUIRED PACKAGES
const mongoose = require('mongoose');
const express = require('express');
const hbs = require('hbs');
const path = require('path');
//cache
require('./cache/APIcache');
//env file
require('dotenv').config();
const connectionString = process.env.CONNECTION_STRING;
const token =process.env.ACCESS_TOKEN;
//APP START 
const exchangeApp = express();
exchangeApp.use(express.urlencoded({ extended:false}));
exchangeApp.use(express.json());
exchangeApp.use(express.static('public')); 
// MongoDB connect and config
mongoose.connect(`${connectionString}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); 

const indexRouter = require('./routes/indexRouter');
const adminRouter = require('./routes/adminRouter');

exchangeApp.use('/index',indexRouter);
exchangeApp.use('/admin',adminRouter);
exchangeApp.set('view engine', 'hbs');
exchangeApp.set('views', path.join(__dirname, 'views'));






exchangeApp.listen(3000, () => {
  console.log('Sunucu çalişiyor...');
  
});
