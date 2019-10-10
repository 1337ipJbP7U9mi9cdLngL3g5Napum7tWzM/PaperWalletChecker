import React from "react";

import {Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import '../styles/components/ad/ad.scss';
// import changelly from '../images/changelly.png';

const Ad =(props) => {
  return (
    <div className="col-10 text-center ad" id="ad">
      <a href="https://www.producthunt.com/posts/paper-wallets-checker?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-paper-wallets-checker" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=155941&theme=dark" alt="Paper Wallets Checker - Cryptocurrency Paper Wallet Balance Checker! | Product Hunt Embed" style={{width: "250px", height: "54px"}} /></a>
    </div>
  );
};

export default Ad;
