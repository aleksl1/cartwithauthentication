import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../store/cart-slice";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { totalItems, items: itemsInCart } = useSelector((state) => state.cart);

  const removeOneFromCartHandler = () => {
    if (totalItems === 1) {
      localStorage.removeItem("totalItems");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("items");
    }
    dispatch(removeItemFromCart({ id: props.id, removeAll: false }));
    props.updateCart();
  };
  const addOneToCartHandler = () => {
    dispatch(
      addItemToCart({
        name: props.name,
        price: props.price,
        amount: 1,
        id: props.id,
      })
    );
    props.updateCart();
  };
  const removeRecordFromCartHandler = () => {
    if (itemsInCart.length === 1) {
      localStorage.removeItem("totalItems");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("items");
    }
    dispatch(removeItemFromCart({ id: props.id, removeAll: true }));
    props.updateCart();
  };
  return (
    <div className={classes["cart-item"]} key={props.id}>
      <div className={classes["cart-item-data"]}>
        <div className={classes["cart-item-image"]}>
          <img src={props.image} alt="" />
        </div>
        <span className={classes["cart-item-amount"]}>{props.amount} for</span>
        <span className={classes["cart-item-total"]}>
          {(props.price * props.amount).toFixed(2)}$
        </span>
      </div>
      {props.inCart ? (
        <div className={classes["cart-item-actions"]}>
          <span
            className={classes["cart-item-actions-remove"]}
            onClick={removeOneFromCartHandler}
          >
            -
          </span>
          <span
            className={classes["cart-item-actions-add"]}
            onClick={addOneToCartHandler}
          >
            +
          </span>
          <span
            className={classes["cart-item-actions-delete"] + " secondary"}
            onClick={removeRecordFromCartHandler}
          >
            +
          </span>
        </div>
      ) : (
        <div className={classes["cart-item-name"]}>
          <p>{props.name}</p>
        </div>
      )}
    </div>
  );
};

export default CartItem;
