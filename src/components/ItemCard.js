import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../store/cart-slice";
import { updateUserCart } from "../store/cart-fetch";
import { useEffect } from "react";

// let wasMounted = false;

const ItemCard = (props) => {
  const dispatch = useDispatch();
  // const userId = useSelector((state) => state.auth.userId);
  // const cartItems = useSelector((state) => state.cart.items);

  const addToCartHandler = () => {
    dispatch(
      addItemToCart({
        name: props.name,
        price: props.price,
        amount: 1,
        id: props.id,
      })
    );
  };
  // useEffect(() => {
  //   if (!userId) {
  //     return;
  //   }
  //   if (cartItems === []) {
  //     return;
  //   }
  //   if (wasMounted === true) {
  //     updateUserCart(userId, cartItems);
  //   }
  //   wasMounted = true;
  // }, [userId, cartItems]);

  return (
    <article className="item-card" key={props.id}>
      <header>
        <h5>{props.name}</h5>
      </header>
      <div className="item-description">{props.description}</div>
      <footer>
        <button onClick={addToCartHandler}>Add to Cart</button>
        <span>{props.price}</span>
      </footer>
    </article>
  );
};

export default ItemCard;
