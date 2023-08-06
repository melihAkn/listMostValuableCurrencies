//packages
require('dotenv').config();
const axios = require('axios');
//utils
const randNumber = require('../functions');
const currencyModel = require('../models/ratesModel');

//env variables 
const token =process.env.ACCESS_TOKEN;

//exchangerates api dan verilerin alınıp 170 para biriminin kendi içinde kariştirilarak veritabanına 
//istenilen sayıda eklenmesi

const getirEkle = async (req,res) => {
    let startTime = performance.now()
    const apiUrl = `http://api.exchangeratesapi.io/v1/latest?access_key=${token}&format=1`; 
    axios.get(apiUrl)
      .then(async response => {
        //gerekli diziler
        let currenciesArray = []; 
        let targetArray = [];
        let finalArray = [];
        //gelen veriden para birimlerinin ve degerlerinin ayrılması
         for  (let i = 0; i <= Object.keys(response.data.rates).length; i++) {
            currenciesArray.push(Object.keys(response.data.rates)[i]);
            targetArray.push(Object.values(response.data.rates)[i]);
        };
        //dizilerin uzunlugunun alinmasi
        let arrayLength = Object.keys(currenciesArray).length -1;
        for  (let i = 0; i < 1; i++) {
            //veritabanına eklenecek verilerin oluşturulması
            let rates = [{baseCurrency: currenciesArray[randNumber(arrayLength)],targetCurrency: currenciesArray[randNumber(arrayLength)],rate: targetArray[randNumber(arrayLength)],}];
            finalArray.push(rates);
            //olusturulan sonucun gormek icin
            //console.log(rates[0]);
        }
        for( let i = 0 ; i < finalArray.length ; i++){
            await currencyModel.insertMany(finalArray[i]);
        }
        let endTime = performance.now();
        const elapsedTime = (endTime - startTime) /1000;
        console.log(elapsedTime.toFixed(2));
      })
      .catch(error => {
        console.error('Hata:', error.message);
      });
    res.send("kayit basarili bir sekilde eklendi");
    
};
const paraBirimiGetir = async (req, res) => {
  try {
    let startTime = performance.now();
    const apiUrl = `http://api.exchangeratesapi.io/v1/latest?access_key=${token}&format=1`;
    const response = await axios.get(apiUrl);
    const dövizBirimleri = Object.keys(response.data.rates);
    let endTime = performance.now();
    const elapsedTime = (endTime - startTime) / 1000;
    console.log(elapsedTime.toFixed(2));
    res.send(dövizBirimleri);
  } catch (error) {
    console.error('Hata:', error.message);
    res.status(500).send('Sunucu hatası');
  }
};

module.exports = {
    getirEkle,
    paraBirimiGetir,
}