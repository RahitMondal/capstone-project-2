import { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./App.css";

import Header from "./components/header/Header";
import Items from "./components/items/Items";
import SubItems from "./components/subItems/SubItems";
import Cart from "./components/cart/Cart";

function App() {
  const [status, setStatus] = useState("Loading...");
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    setStatus("Loading...");
    try {
      const response = await fetch("http://localhost:5000/api/getCartItems");
      const data = await response.json();
      setCartItems(data.result.cartItems);
      setCartCount(data.result.itemsCount);
      if (!response.ok) setStatus("Couldn't connect to the database! :(");
      else setStatus(false);
    } catch (error) {
      setCartItems(null);
      setStatus(false);
    }
  };

  const addToCart = async (subItem) => {
    try {
      await fetch("http://localhost:5000/api/addToCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subItem),
      });
      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (subItem) => {
    try {
      await fetch("http://localhost:5000/api/removeFromCart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subItem: subItem.name }),
      });
      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  const emptyCart = async () => {
    try {
      await fetch("http://localhost:5000/api/emptyCart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {status || (
        <Router>
          <Header cartCount={cartCount} />
          <Switch>
            <Route path="/" exact>
              <Items />
            </Route>
            <Route path="/cart" exact>
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                emptyCart={emptyCart}
              />
            </Route>
            <Route path="/:item" exact>
              <SubItems addToCart={addToCart} />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
