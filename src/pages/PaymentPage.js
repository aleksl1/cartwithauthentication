import { useSelector } from "react-redux";
import CartItem from "../components/cart/CartItem";

const Payment = () => {
  const userName = useSelector((state) => state.auth.userName);
  const existingCart = JSON.parse(localStorage.getItem("items"));
  const orderDetails =
    existingCart.length > 0
      ? existingCart.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            image={item.image}
            inCart={false}
          />
        ))
      : null;
  const finalizeOrderHandler = () => {
    console.log(`send order to database`);
  };

  return (
    <div className="order-confirmation">
      <article>
        <header>
          <h2>{userName}</h2>
          <span>You are ordering following items: </span>
        </header>
        <div className="order-details">{orderDetails}</div>
        <div className="order-delivery-data">
          <p>Additional data inputs</p>
        </div>
        <button onClick={finalizeOrderHandler}>Finalize</button>
      </article>
    </div>
  );
};

export default Payment;
