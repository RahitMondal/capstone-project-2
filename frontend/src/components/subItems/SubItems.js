import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./SubItems.css";

import SubItem from "../shared/subItem/SubItem";

const SubItems = ({ addToCart }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [subItemsData, setSubItemsData] = useState([]);

  const endPoint = useParams().item;

  useEffect(() => {
    getSubItemsData();
  }, []);

  const getSubItemsData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/${endPoint}`);
      const data = await response.json();
      setSubItemsData(data.result[0]);
      setIsLoading(false);
    } catch (error) {
      setSubItemsData(null);
      setIsLoading(false);
    }
  };

  let content,
    head = null;
  if (isLoading) content = "Loading...";
  else if (subItemsData === undefined)
    content = "There is no item such as " + endPoint + "! :(";
  else if (subItemsData === null) content = "Couldn't fetch data! :(";
  else {
    head = <div style={{ textAlign: "center" }}>{subItemsData.name}</div>;
    const subItems = subItemsData.subItems;
    content = subItems.map((subItem) => {
      return (
        <SubItem
          key={subItem.name}
          subItem={subItem}
          onClickHandler={addToCart}
          buttonLabel="Order Now"
        />
      );
    });
  }

  return (
    <div>
      {head}
      {content}
    </div>
  );
};

export default SubItems;
