import React from "react";
  
import {Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import '../styles/components/ad/ad.scss';
import changelly from '../images/changelly.png';

const Ad =(props) => {
  return (
<<<<<<< HEAD
    <div className="col-10 text-center ad" id="ad" onClick={props.toggleAd}>
      Your Ad here Supports this Site and the Crypto Community!
      <Popover className="popover" placement="bottom" isOpen={props.popoverOpenAd}
                            target="ad" toggle={props.toggleAd}
                    >
        <PopoverHeader className="text-center">Contact Us</PopoverHeader>
        <PopoverBody>
          1337ipjbp7u9mi9cdlngl3g5napum7twzm@protonmail.com
        </PopoverBody>
      </Popover>
=======
    <div className="col-10 text-center ad" id="ad">
      <a href='https://old.changelly.com/?ref_id=8ejy4gxwaghvb0cu' target="_blank"
        rel="noopener noreferrer"
      >
        <img src={changelly} alt="changelly" />
      </a>
>>>>>>> 06b39160a693f35ca36765b135d59b6cb91c0e17
    </div>
    );
};

export default Ad;
