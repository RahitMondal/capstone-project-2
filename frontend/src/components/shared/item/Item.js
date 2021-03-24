import { Link } from "react-router-dom";

import "./Item.css";

const Item = ({ name, image }) => {
  return (
    <Link className="item" to={`/${name}`}>
      <div className="image-box">
        <img className="item-image" src={image} alt={name} />
      </div>
      <div className="image-title">{name}</div>
    </Link>
  );
};

export default Item;
