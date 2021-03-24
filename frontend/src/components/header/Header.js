import { Link } from "react-router-dom";
import { BiCartAlt } from "react-icons/bi";

import "./Header.css";

const Header = ({ cartCount }) => {
  return (
    <header id="app-header">
      Food Ordering Portal
      <Link id="cart" to="/cart">
        <BiCartAlt /> {cartCount}
      </Link>
    </header>
  );
};

export default Header;
