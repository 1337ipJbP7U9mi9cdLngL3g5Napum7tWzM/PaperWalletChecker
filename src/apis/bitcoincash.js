import axios from 'axios';

export const bchApi = async (addresses, resolve, reject) => {
  let addressesBalance = {};

  const params = {
    addresses: []
  }

  params.addresses = addresses

  await axios.post('https://rest.bitcoin.com/v2/address/details', params).then(res => {
    for(let i=0; i < res.data.length; i++) {
      addressesBalance[addresses[i]] = res.data[i].balanceSat / 1e+8;
    }
  }).catch(err => {
    console.log(err)
  })

  resolve(addressesBalance)
};
