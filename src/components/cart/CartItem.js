import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../store/cart-slice";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const removeOneFromCartHandler = () => {
    dispatch(removeItemFromCart({ id: props.id, removeAll: false }));
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
  };
  const removeRecordFromCartHandler = () => {
    dispatch(removeItemFromCart({ id: props.id, removeAll: true }));
  };
  return (
    <div className="cart-item" key={props.id}>
      <div className="cart-item-data">
        <span>{props.name}</span>
        <span>x {props.amount}</span>
        <span>{props.price * props.amount}$</span>
      </div>
      <div className="cart-item-actions">
        <span onClick={removeOneFromCartHandler}>-</span>
        <span onClick={addOneToCartHandler}>+</span>
        <span onClick={removeRecordFromCartHandler}>Delete</span>
      </div>
    </div>
  );
};

export default CartItem;
