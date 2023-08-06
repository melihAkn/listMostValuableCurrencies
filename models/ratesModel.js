const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    baseCurrency: String,
    targetCurrency: String,
    rate: Number,
  });
  
  const Currency = mongoose.model('Currency', currencySchema);
  module.exports = Currency;
