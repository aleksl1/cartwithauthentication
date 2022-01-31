import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart-slice";

const ItemCard = (props) => {
  const dispatch = useDispatch();
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

  return (
    <article className="item-card" key={props.id}>
      <header>
        <img src={props.image} alt="" />
      </header>
      <div className="item-description">
        <span>{props.name}</span>
        {/* <p>{props.description}</p> */}
        <h5>{props.price}$</h5>
      </div>
      <footer>
        <a href="#" role="button" className="secondary">
          Details
        </a>
        <a
          href="#"
          role="button"
          className="contrast"
          onClick={addToCartHandler}
        >
          Add
        </a>
      </footer>
    </article>
  );
};

export default ItemCard;
