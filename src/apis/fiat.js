import axios from 'axios';

export const fiatPriceCheck = (cryptoName, fiatSym, handleFiatPrice, resolve, reject) => {
  axios.get("https://api.coingecko.com/api/v3/coins/" + cryptoName.toLowerCase() + "?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false")
  .then(res => {
    // console.log(res.data.market_data.current_price);
    const current_prices = res.data.market_data.current_price;
<<<<<<< HEAD
    
=======

>>>>>>> 06b39160a693f35ca36765b135d59b6cb91c0e17
    handleFiatPrice(current_prices[fiatSym], current_prices);
    resolve('Fiat Done');
  }).catch(error => {
    console.log(error);
    reject(error);
  });
};
