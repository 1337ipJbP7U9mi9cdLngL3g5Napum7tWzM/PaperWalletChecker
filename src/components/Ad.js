import React from "react";

import {Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import '../styles/components/ad/ad.scss';
import changelly from '../images/changelly.png';

const Ad =(props) => {
  return (
    <div className="col-10 text-center ad" id="ad">
      <a href='https://old.changelly.com/?ref_id=8ejy4gxwaghvb0cu' target="_blank"
        rel="noopener noreferrer"
      >
        <img src={changelly} alt="changelly" />
      </a>
    </div>
    );
};

export default Ad;
