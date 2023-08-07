const currencyModel = require('../models/ratesModel');
const degerBul = async (req,res,next) => {
    const baseCurrency = req.params.baseCurrency;
    console.log(baseCurrency)
    let startTime = performance.now()
    let rateArray =[]
    const birimBul = await currencyModel.find({baseCurrency :baseCurrency});
    birimBul.forEach(e => {
        rateArray.push(e.rate);
    });
    let biggestNumber = rateArray[0];
    for (let i = 1; i < rateArray.length; i++) {
      if (rateArray[i] > biggestNumber) {
        biggestNumber = rateArray[i];
  }
}
    console.log(biggestNumber);
    const findBigValue = await currencyModel.find({rate : biggestNumber , baseCurrency : baseCurrency});
    let endTime = performance.now();
    const elapsedTime = (endTime - startTime) /1000;
    console.log(elapsedTime.toFixed(2));
    res.send(findBigValue);
};
const index = (req,res) => {
    res.render('index');
}
module.exports = {
    degerBul,
    index,
}