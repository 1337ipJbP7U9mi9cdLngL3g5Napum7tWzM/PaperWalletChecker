import React from "react";

import {Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import '../styles/components/ad/ad.scss';

const Ad =(props) => {
  return (
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
    </div>
    );
};

export default Ad;
