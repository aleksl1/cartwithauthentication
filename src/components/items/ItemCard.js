import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart-slice";
import { useState } from "react";
import ItemDetailsPage from "./ItemDetailsPage";
import { Link } from "react-router-dom";
import classes from "./ItemCard.module.css";

const ItemCard = (props) => {
  const [showItemDetail, setShowItemDetail] = useState(false);
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(
      addItemToCart({
        name: props.name,
        price: props.price,
        amount: 1,
        id: props.id,
        image: props.image,
      })
    );
  };

  const showDetailsPageHandler = () => {
    setShowItemDetail(true);
  };

  return (
    <>
      {showItemDetail ? (
        <ItemDetailsPage />
      ) : (
        <article className={classes["item-card"]} key={props.id}>
          <header>
            <img src={props.image} alt="" />
          </header>
          <div className={classes["item-description"]}>
            <span>{props.name}</span>
            <h5>{props.price}$</h5>
          </div>
          <footer>
            <Link
              to={`/details/:${props.id}`}
              href="#"
              role="button"
              className="secondary"
              onClick={showDetailsPageHandler}
            >
              Details
            </Link>
            <span className={classes["add-btn"]} onClick={addToCartHandler}>
              Add
            </span>
          </footer>
        </article>
      )}
    </>
  );
};

export default ItemCard;
