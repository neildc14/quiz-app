import React from "react";
import owl from "../assets/images/owl.jpg";

function Header() {
  return (
    <header>
      <div className="image_container">
        <img className="image_logo" src={owl} alt="owl" />
      </div>
      <h1 className="logo">isQUIZzy</h1>
    </header>
  );
}

export default Header;
