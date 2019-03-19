import React from "react";

import { Button } from "reactstrap";
import '../styles/components/ad/ad.scss';

const Ad =(props) => {
  return (
    <div className="col-10 text-center ad" id="ad" onClick={props.toggleAd}>
      Want to Exchange Instantly from the Best Prices around on all Exchanges
      with just an Email?
      <Button type="changelly" color="primary"
        onClick={() => window.open('https://old.changelly.com/?ref_id=8ejy4gxwaghvb0cu', "_blank")}
      >
        Exchange Instantly!
      </Button>
    </div>
    );
};

export default Ad;
