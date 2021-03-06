import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addItemToCart } from "../../store/cart-slice";
import classes from "./ItemDetailsPage.module.css";

const ItemDetailsPage = () => {
  const [currentItem, setCurrentItem] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemId = +location.pathname.split("").splice(10, 1);
  const items = useSelector((state) => state.items.items);

  useEffect(() => {
    const storedItem = JSON.parse(localStorage.getItem("itemDetails"));
    if (!storedItem) {
      const newItem = items.find((item) => item.id === itemId);
      localStorage.setItem("itemDetails", `${JSON.stringify(newItem)}`);
      setCurrentItem(newItem);
    } else {
      setCurrentItem(storedItem);
    }
    return () => {
      localStorage.removeItem("itemDetails");
    };
  }, [items, itemId]);

  const addToCartAndRedirectHandler = () => {
    navigate("/cart");
    dispatch(
      addItemToCart({
        name: currentItem.name,
        price: currentItem.price,
        amount: 1,
        id: currentItem.id,
        image: currentItem.image,
      })
    );
  };

  return (
    <div className={classes["item-details"]}>
      <div
        className={classes["close-details-page"]}
        onClick={() => navigate(-1)}
      >
        X
      </div>
      <div className={classes["item-name"]}>
        <h1>{currentItem.name}</h1>
      </div>
      <div className={classes["item-category"]}>
        <span>{currentItem.category}</span>
      </div>
      <div className={classes["item-image"]}>
        <img src={currentItem.image} alt={currentItem.name} />
      </div>
      <div className={classes["item-description"]}>
        <p>{currentItem.description}</p>
      </div>

      <div className={classes["item-actions-panel"]}>
        <span className={classes["item-price"]}>{currentItem.price}$</span>
        <button
          className="outline secondary"
          onClick={addToCartAndRedirectHandler}
        >
          Buy
        </button>
        <button className="outline secondary" onClick={() => navigate(-1)}>
          Shop
        </button>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
