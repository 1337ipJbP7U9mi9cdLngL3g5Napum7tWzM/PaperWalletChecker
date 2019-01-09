import axios from 'axios';

export const bitcoinApi = async (addresses, resolve, reject) => {
  let addressesBalance = {};
  const addressesBech = [];
  const addressesOld = [];
  
  let i;
  for (i = 0; i < addresses.length; i++) { 
    if (addresses[i].slice(0,2) === "bc") {
      addressesBech.push(addresses[i]);
    } else {
      addressesOld.push(addresses[i]);
    }
  }
  
  axios.get("https://blockchain.info/balance?active=" + addressesOld.toString().replace(/,/g, '|') + "&cors=true")
  .then(res => {
    const data = res.data;
    
    let i;
    for (i = 0; i < addressesOld.length; i++) {
      const addressBalance = data[addressesOld[i]].final_balance / 100000000;
      addressesBalance[addressesOld[i].toString()] = addressBalance.toString();
    }
  }).catch((error) => {
    console.log(error);
  });
    
  let addressRequests = [];
  addressesBech.forEach(address => {
    addressRequests.push("https://api.blockchair.com/bitcoin/dashboards/address/" 
    + address);
  });
  
  function delay() {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 2000);
    });
  }
  
  function axiosRequest() {
    axios.get(addressRequests[j])
    .then((res) => {
      const data = res.data.data[addresses[j]];
      addressesBalance[addresses[j]] = data.address.balance / 100000000;
    }).catch((error) => {
      console.log(error);
    });
  }
  
  let j;
  for (j=0; j<addressRequests.length; j++) {
    await axiosRequest(addressRequests[j], addresses[i]);
    await delay();
  }
  
  resolve(addressesBalance);  
};
  