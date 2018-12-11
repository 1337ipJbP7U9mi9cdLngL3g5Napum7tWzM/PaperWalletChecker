import React, { Component } from 'react';
import Header from './components/Header';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy, faQuestionCircle, faQrcode } from '@fortawesome/free-solid-svg-icons';

import AddressList from './components/AddressList';

library.add(faCopy, faQuestionCircle, faQrcode);

class App extends Component {
  constructor(props) {
    super(props);
    
    // cryptoId is used in CoinMarketCap api
    this.state = {
      fiatPrice: 0,
      currentPriceFiat: {},
      fiatSym: "usd",
      cryptoSym: "btc",
      cryptoId: 1,
      cryptoName: "bitcoin",
      checkBalanceState: "unchecked"
    };
    
    this.handleFiatPrice = this.handleFiatPrice.bind(this);
    this.handleFiatSym = this.handleFiatSym.bind(this);
    this.handleCryptoSymId = this.handleCryptoSymId.bind(this);
    this.handleCheckBalanceState = this.handleCheckBalanceState.bind(this);
  }
  
   handleCheckBalanceState(checkBalanceState) {
    this.setState({checkBalanceState: checkBalanceState});
  }
  
  handleCryptoSymId(cryptoSym, cryptoId, cryptoName) {
    this.setState({cryptoSym: cryptoSym, cryptoId: cryptoId, cryptoName: cryptoName});
  }
  
  handleFiatSym(fiatSym) {
    this.setState({fiatSym: fiatSym});
    
    if (this.state.currentPriceFiat !== {}) {
      this.setState({fiatPrice: this.state.currentPriceFiat[fiatSym]});
    }
  }
  
  handleFiatPrice(price, current_prices) {
    this.setState(() => {
      return {
        currentPriceFiat: current_prices
      };
    });
    
    this.setState(() => {
      return {
        fiatPrice: this.state.currentPriceFiat[this.state.fiatSym]
      };
    });
  }
  
  render() {
    return (
        <div className="App h-100">
          <Header 
            fiatPrice={this.state.fiatPrice}
            handlefiatPrice={this.state.handleFiatPrice}
            fiatSym={this.state.fiatSym}
            handleFiatSym={this.handleFiatSym}
            cryptoSym={this.state.cryptoSym}
            handleCryptoSymId={this.handleCryptoSymId}
            checkBalanceState={this.state.checkBalanceState}
            handleCheckBalanceState={this.handleCheckBalanceState}
          />
          <AddressList 
            fiatSym={this.state.fiatSym}
            fiatPrice={this.state.fiatPrice}
            handleFiatPrice={this.handleFiatPrice}
            cryptoSym={this.state.cryptoSym}
            cryptoId={this.state.cryptoId}
            cryptoName={this.state.cryptoName}
            checkBalanceState={this.state.checkBalanceState}
            handleCheckBalanceState={this.handleCheckBalanceState}
          />
        </div>
    );
  }
}

export default App;
