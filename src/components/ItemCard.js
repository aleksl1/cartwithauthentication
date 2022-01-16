import { useDispatch } from "react-redux";
import { addItemToCart } from "../store/cart-slice";

const ItemCard = (props) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    console.log(`add`);
    dispatch(
      addItemToCart({
        name: props.name,
        price: props.price,
        amount: 1,
        id: props.id,
      })
    );
  };

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
