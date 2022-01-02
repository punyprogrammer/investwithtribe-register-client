import React from "react";
import "./topbar.css";

const Topbar = () => {
  return (
    <div className="topbar__container">
      <div className="topbar__logo">
        <img
          src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1630925990126x804751725504911700%2Ft%2520ibe%2520%25281%2529.png?w=192&h=85&auto=compress&fit=crop&dpr=1"
          alt=""
          className="topbar__logo__img"
        />

        <span className="topbar__logo__text"></span>
      </div>
    </div>
  );
};

export default Topbar;
