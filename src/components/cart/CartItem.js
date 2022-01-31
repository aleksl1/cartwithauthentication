import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../store/cart-slice";

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
    <div className="cart-item" key={props.id}>
      <div className="cart-item-data">
        <div className="cart-item-image">
          <img src={props.image} alt="" />
        </div>
        <span className="cart-item-amount">{props.amount} for</span>
        <span className="cart-item-total">
          {(props.price * props.amount).toFixed(2)}$
        </span>
      </div>
      <div className="cart-item-actions">
        <span
          className="cart-item-actions-remove"
          onClick={removeOneFromCartHandler}
        >
          -
        </span>
        <span className="cart-item-actions-add" onClick={addOneToCartHandler}>
          +
        </span>
        <span
          className="cart-item-actions-delete secondary"
          onClick={removeRecordFromCartHandler}
        >
          +
        </span>
      </div>
    </div>
  );
};

export default CartItem;
