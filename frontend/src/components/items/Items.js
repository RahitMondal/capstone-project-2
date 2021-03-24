import { useState, useEffect } from "react";

import "./Items.css";

import Item from "../shared/item/Item";

const Items = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/items`);
      const data = await response.json();
      setItems(data.result);
      setIsLoading(false);
    } catch (error) {
      setItems(null);
      setIsLoading(false);
    }
  };

  let content;
  if (isLoading) content = <div className="msg-box">Loading...</div>;
  else if (items === null)
    content = <div className="msg-box">Couldn't fetch data! :(</div>;
  else
    content = items.map((item) => {
      return <Item key={item.name} name={item.name} image={item.image} />;
    });
  return <div id="items-container">{content}</div>;
};

export default Items;
