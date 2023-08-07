const NodeCache = require('node-cache');
const axios = require('axios');
require('dotenv').config();
const token =process.env.ACCESS_TOKEN;

const apicache = new NodeCache({ stdTTL: 60 * 60 }); // 1 saat önbellekte tutma süresi
const getDataToCache = async _ => {
  const apiResponse = apicache.get('apiResponse'); // Önbellekten veriyi alma

  if (apiResponse) {
    console.log('Önbellekten veri alındı');
    return apiData;
  } else {
    console.log('API çağrısı yapılıyor');
    try {
      const response = await axios.get(`http://api.exchangeratesapi.io/v1/latest?access_key=${token}&format=1`); // API çağrısı
      const apiData = response.data;

      // Veriyi önbelleğe alma
      apicache.set('apiResponse', apiData);
      //console.log(apiData);
      return apiData;
    } catch (error) {
      console.error('API çağrısı hatası:', error.message);
    }
  }
}
getDataToCache()
module.exports = apicache;