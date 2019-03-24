import React from "react";
import '../styles/components/ad/ad2.scss';

const Ad2 =(props) => {
  return (
    <div className="ad2" id="ad" onClick={props.toggleAd}>
      <iframe allowtransparency="true" frameBorder="0" hspace="0" vspace="0"
        marginHeight="0" marginWidth="0" scrolling="no" width="234" height="60"
        src="https://localbitcoins.com/affiliate-embed/half-banner?ch=zn1m"
        title="localbitcoins">
      </iframe>
    </div>
    );
};

export default Ad2;
