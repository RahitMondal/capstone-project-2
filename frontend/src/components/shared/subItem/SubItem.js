import "./SubItem.css";

const SubItem = ({ subItem, onClickHandler, buttonLabel }) => {
  return (
    <div id="sub-items-container">
      <div className="left">
        <p style={{ fontWeight: "bold" }}>{subItem.name}</p>
        <br />
        &#8377; {subItem.price}
        <br />
        <p>{subItem.description}</p>
        <button
          className="order-now-btn"
          onClick={() => {
            onClickHandler(subItem);
          }}
        >
          {buttonLabel}
        </button>
      </div>
      <div className="right">
        <img src={subItem.image} alt={subItem.name} />
      </div>
    </div>
  );
};

export default SubItem;
