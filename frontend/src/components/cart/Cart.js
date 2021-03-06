import { Link } from "react-router-dom";

import "./Cart.css";

import SubItem from "../shared/subItem/SubItem";

const Cart = ({ cartItems, removeFromCart, emptyCart }) => {
  let content = null,
    head = null,
    showPlaceOrderButton = false;

  if (cartItems === null)
    content = <div className="msg-box">Couldn't fetch data! :(</div>;
  else if (cartItems.length === 0)
    content = <div className="msg-box">There is no item in the cart! :(</div>;
  else {
    head = (
      <div className="cart-header" style={{ textAlign: "center" }}>
        You Have Ordered:
      </div>
    );
    content = cartItems.map((subItem) => {
      return (
        <SubItem
          key={subItem.name}
          subItem={subItem}
          onClickHandler={removeFromCart}
          buttonLabel="Remove"
        />
      );
    });
    showPlaceOrderButton = true;
  }

  return (
    <div className="cart">
      {head}
      {content}
      {showPlaceOrderButton && (
        <Link to="/">
          <button className="place-order" onClick={emptyCart}>
            Place Order
          </button>
        </Link>
      )}
    </div>
  );
};

export default Cart;
