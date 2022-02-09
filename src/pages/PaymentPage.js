import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/cart/CartItem";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/layout/LoadingSpinner";
import { initializeCart } from "../store/cart-slice";
import { useNavigate } from "react-router-dom";
import DeliveryData from "../components/other/DeliveryData";
import PaymentMethod from "../components/other/PaymentMethod";
import classes from "./PaymentPage.module.css";

const PaymentPage = () => {
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderError, setOrderError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.auth.userName);
  const userId = useSelector((state) => state.auth.userId);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const existingCart = JSON.parse(localStorage.getItem("items"));
  const orderDetails = existingCart ? (
    existingCart.map((item) => (
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
  ) : (
    <p>No items</p>
  );
  const finalizeOrderHandler = () => {
    setOrderStarted(true);
    sendOrder(userId);
  };

  const sendOrder = (userId) => {
    let orderId = "unregisteredUserOrder";
    if (userId) {
      orderId = userId;
    }
    fetch(
      `https://shopjs-fc7ef-default-rtdb.europe-west1.firebasedatabase.app/Orders/${orderId}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          order: { ...existingCart },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          setOrderSuccess(false);
          throw new Error("Ordering error");
        }
        response.json();
        setOrderSuccess(true);
      })
      .catch((error) => setOrderError(error.message));
  };

  useEffect(() => {
    if (orderSuccess) {
      dispatch(initializeCart({ totalItems: 0, totalPrice: 0, items: [] }));
      localStorage.removeItem("items");
      localStorage.removeItem("totalItems");
      localStorage.removeItem("totalPrice");
      const successRedirect = setTimeout(() => navigate("/"), 2000);

      return () => {
        clearTimeout(successRedirect);
      };
    }
  }, [orderSuccess, dispatch, navigate]);

  const pageContent = (
    <div className={classes["order-confirmation"]}>
      <article>
        <header>
          {userName ? <h2>{userName}</h2> : null}
          <span>You are ordering following items: </span>
        </header>
        <div className={classes["order-details"]}>{orderDetails}</div>
        <DeliveryData userName={userName} />
        <p>
          Total price for your items is{" "}
          <strong>{totalPrice.toFixed(2)}$</strong>
        </p>
        <PaymentMethod />
        <button
          className={classes["order-confirmation-btn"]}
          onClick={finalizeOrderHandler}
        >
          Finalize
        </button>
      </article>
    </div>
  );

  const pageErrorContent = (
    <div className={classes["order-confirmation"]}>
      <article>
        <p>Ordering error, reason: {orderError}</p>
      </article>
    </div>
  );

  const pageOrderSuccessContent = (
    <div className={classes["order-confirmation"]}>
      <article>
        <p>Your order was successfull! Thank You for using our service</p>
      </article>
    </div>
  );

  return (
    <>
      {!orderSuccess && !orderStarted && pageContent}
      {!orderSuccess && orderStarted && !orderError && <LoadingSpinner />}
      {!orderSuccess && orderStarted && orderError && pageErrorContent}
      {orderSuccess && orderStarted && pageOrderSuccessContent}
    </>
  );
};

export default PaymentPage;
