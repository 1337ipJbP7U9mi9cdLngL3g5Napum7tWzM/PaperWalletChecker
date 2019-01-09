import React, { Component } from "react";
import WAValidator from 'wallet-address-validator';
import CSVReader from 'react-csv-reader';
import {CSVLink} from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaGithub, FaReddit, FaBitcoin } from 'react-icons/fa';
import { Button, Form, FormGroup, Popover, PopoverHeader, PopoverBody,
         Modal, ModalHeader, ModalBody, Table, Input, InputGroup,
         InputGroupAddon } from 'reactstrap';

import '../styles/components/addresslist/addresslist.scss';
import Addresses from './Addresses';
import Totals from './Totals';
import QrAddressReader from './QrAddressReader';
import {allApis} from '../apis/allApis';

class AddressList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses: [],
      cryptoSym: this.props.cryptoSym,
      cryptoId: this.props.cryptoId,
      filename: 'PaperWalletChecker.csv',
      checkbalanceState: this.props.checkbalanceState,
      popoverOpenInfo: false,
      modal: false,
      qrmodal: false,
      progressBar: 0
    };
    
    this.handleFilename = this.handleFilename.bind(this);
    this.handleCsvImport = this.handleCsvImport.bind(this);
    this.addAddress = this.addAddress.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);
    this.checkBalance = this.checkBalance.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleQrModal = this.toggleQrModal.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.handleSocial = this.handleSocial.bind(this);
  }
  
  componentDidUpdate(prevProps) {
    this.clearAddresses(prevProps);
    this.updateAddresses(prevProps);
  }
  

  clearAddresses(prevProps) {
    if (prevProps.cryptoSym !== this.props.cryptoSym) {
      this.setState({addresses: []});
      this.props.handleCheckBalanceState("unchecked");
      this.props.handleFiatPrice(0);
    }
  }
  
  updateAddresses(prevProps) {
    if (prevProps.fiatSym !== this.props.fiatSym) {
      const addresses = this.state.addresses.map(a => a.key);
      let i;
      for (i = 0; i < addresses.length; i++) {
        const updateAddress = addresses[i];
        const index = this.state.addresses.findIndex(x => x.key === updateAddress);
        const newFiatAmount = this.state.addresses[index].cryptoAmount * this.props.fiatPrice;
        this.setState((prevState) => {
          const address = prevState.addresses[index];
          address.fiatAmount = newFiatAmount;
          return ({
            address
          });
        });
      }
    }
  }
  
  toggleModal() {
    this.setState({modal: !this.state.modal});
  }
  
  toggleQrModal() {
    this.setState({qrmodal: !this.state.qrmodal});
  }
  
  toggleInfo() {
    this.setState({
      popoverOpenInfo: !this.state.popoverOpenInfo
    });
  }
  
  checkBalance(event) {
    this.props.handleCheckBalanceState("checking");
    // const cryptoId = this.props.cryptoId;
    const fiatSym = this.props.fiatSym;
    const handleFiatPrice = this.props.handleFiatPrice;
    const addresses = this.state.addresses.map(a => a.key);
    const cryptoSym = this.props.cryptoSym;
    const cryptoName = this.props.cryptoName;
    
    const balancePromises = allApis(addresses, cryptoName, cryptoSym, fiatSym, handleFiatPrice);
    
    Promise.all(balancePromises)
      .then((result) => {
        // console.log(result[1]);
        let i;
        for (i = 0; i < addresses.length; i++) {
          const addressBalance = parseFloat(result[1][addresses[i]]);
          const updateAddress = addresses[i];
          const index = this.state.addresses.findIndex(x => x.key === updateAddress);
          const addressAttributes = {
            cryptoAmount: addressBalance,
            fiatAmount: addressBalance * this.props.fiatPrice
          };
          this.setState({
            addresses: [
              ...this.state.addresses.slice(0, index),
              Object.assign({}, this.state.addresses[index], addressAttributes),
              ...this.state.addresses.slice(index + 1)
            ]
          });
        }
        this.props.handleCheckBalanceState("checked");
      });
    
    event.preventDefault();
  }
  
  handleFilename(event) {
    this.setState({
      filename: 
        event.target.value.includes('.csv') ? 
          event.target.value : event.target.value  + '.csv'
    });
  }
  
  handleCsvImport(data) {
    data.map((row) => {
      row.map((col) => {
        const addObject = this.state.addresses;
        const checkDuplicateArray = (addObject.map(a => a.key));
        
        if (WAValidator.validate(col.trim(), this.props.cryptoSym)) {
          if (checkDuplicateArray.includes(col.trim())) {
            alert("you have entered a duplicte address");
          } else {
            let newAddress = {
              key: col.trim(),
              cryptoAmount: '',
              fiatAmount: ''
            };
            
            this.setState((prevState) => {
              return {
                addresses: prevState.addresses.concat(newAddress),
                modal: !this.state.modal
              };
            });
          }
        } else {
          // console.log("Please enter a valid address or check that you have selected : "
          //         + this.props.cryptoSym.toUpperCase());
        }
        return null;
      });
      return null;
    });
  }
  
  addAddress(event, result) {
    if (event) {
      event.preventDefault();
    }
    const addObject = this.state.addresses;
    console.log(result);
    const address = this._inputElement.value !== '' ? this._inputElement.value.trim() : result || '';
    const checkDuplicateArray = (addObject.map(a => a.key));
    const duplicate = checkDuplicateArray.includes(address);
    
    if (duplicate) {
      alert("you have entered a duplicte address");
    } else if (address !== ""
              && WAValidator.validate(address, this.props.cryptoSym))  {
      var newAddress = {
        key: address,
        cryptoAmount: '',
        fiatAmount: ''
      };

      this.setState((prevState) => {
        return {
          addresses: prevState.addresses.concat(newAddress)
        };
      });
    } else {
      alert("Please enter a valid address");
    }

    this._inputElement.value = "";
    
    if (!event) {
      this.setState({qrmodal: !this.state.qrmodal});
    }
  }
  
  deleteAddress(key) { 
    var filteredAddresses = this.state.addresses.filter(function (address) {
      return (address.key !== key);
    });

    this.setState({
      addresses: filteredAddresses
    });
  }
  
  handleSocial(social) {
    switch(social) {
      case "github": {
        window.open('https://github.com/1337ipJbP7U9mi9cdLngL3g5Napum7tWzM/PaperWalletChecker', "_blank");
        break;
      }
      case "reddit": {
        window.open('https://www.reddit.com/r/btc/comments/ae9b2t/paper_wallet_checker_simple_and_easy_way_to_check/', '_blank');
        break;
      }
      case "bitcoin": {
        window.open('https://bitcointalk.org/index.php?topic=5090189.new;topicseen', '_blank');
        break;
      }
      default: {
        break;
      }
    }
  }
  
  render(){
    const csvDownloadHeaders = [
      {label: 'Address', key: 'key'},
      {label: 'btc:', key: 'cryptoAmount'},
      {label: 'USD:', key: 'fiatAmount'}
    ];
    
    return (
      <div className="address-list row">
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleModal}>
            <div>
              <h3>
                Import Your Spreadsheet:
              </h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <CSVReader
              cssClass="csv-import"
              onFileLoaded={this.handleCsvImport}
            />
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.qrmodal} toggle={this.toggleQrModal} className="">
          <ModalHeader toggle={this.toggleQrModal}>
            <div>
              <h3>
                Qrcode Address Reader:
              </h3>
            </div>
          </ModalHeader>
          <ModalBody>
            {this.state.qrmodal && <QrAddressReader addAddress={this.addAddress} />}
          </ModalBody>
        </Modal>
        <div className="col-3 address-buttons">
          <Button type="balance" color="success" size="lg"
            onClick={this.checkBalance}
          >
            Check Balance
          </Button>
          <Button type="import" color="warning" size="lg" className="d-block"
            onClick={this.toggleModal}
          >
            Load Spreadsheet
          </Button>
          <CSVLink data={this.state.addresses} 
            filename={this.state.filename}
            className="btn btn-lg btn-primary"
            headers={csvDownloadHeaders}
            target="_blank"
          >
              Export Spreadsheet
          </CSVLink>
          <h5 className="export-filename">Export Filename : </h5>
          <Input className="col-9" onChange={this.handleFilename}></Input>
          <div className="social-media">
            <div className="col-4 d-inline">
              <Button size="sm" onClick={() => this.handleSocial("github")}>
                <FaGithub />
              </Button>
            </div>
            <div className="col-4 d-inline">
              <Button size="sm" onClick={() => this.handleSocial("reddit")}>
                <FaReddit />
              </Button>
            </div>
            <div className="col-4 d-inline">
              <Button size="sm" onClick={() => this.handleSocial("bitcoin")}>
                <FaBitcoin />
              </Button>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="input-form col-12">
            <Form inline onSubmit={this.addAddress}>
              <FormGroup className="col-12 row no-gutters">
                <InputGroup className="col-12">
                  <InputGroupAddon addonType="prepend">
                    <Button onClick={this.toggleQrModal} >
                      <FontAwesomeIcon icon="qrcode" />
                    </Button>              
                  </InputGroupAddon>
                  <Input className="" id="input-address-text" innerRef={(a) => this._inputElement = a} />
                  <InputGroupAddon addonType="append">
                    <Button className="input-address-submit" color="info" type="submit">Enter a New Paper Wallet</Button>
                    <Button id="Popover1" onClick={this.toggleInfo}>
                      <FontAwesomeIcon icon="question-circle" inverse className="" />
                    </Button>
                    <Popover className="popover" placement="bottom" isOpen={this.state.popoverOpenInfo}
                             target="Popover1" toggle={this.toggleInfo}
                    >
                      <PopoverHeader className="text-center">Public Addresses Only</PopoverHeader>
                      <PopoverBody>
                        <ul>
                          <li>Validates the Public Address</li>
                          <li>Enter One Address at a Time</li>
                          <li>You can Import Public Keys from a Spreadsheet</li>
                          <li>Click on any Address to View a Qrcode</li>
                        </ul>
                      </PopoverBody>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
                <div className="input-address-buttons">
                </div>
              </FormGroup>
            </Form>
          </div>
          <Table hover={true}>
            <Totals   
              fiatSym={this.props.fiatSym}
              addresses={this.state.addresses}
              checkBalanceState={this.props.checkBalanceState}
              cryptoSym={this.props.cryptoSym}
            />
            <Addresses entries={this.state.addresses}
                       delete={this.deleteAddress}
            />
          </Table>
        </div>
      </div>
    );
  }
}


export default AddressList;
