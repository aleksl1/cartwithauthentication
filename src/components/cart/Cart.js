import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../store/cart-slice";
import { Link } from "react-router-dom";

// const numberOfItems = "11";
// const totalPrice = "25";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCartVisible = useSelector((state) => state.cart.isVisible);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(toggleCart(true));
  }, [dispatch]);

  const showCartItems = cartItems.map((item) => (
    <li key={item.id}>
      {item.name} + {item.price} +{item.amount}
    </li>
  ));

  const cartCloseHandler = () => {
    dispatch(toggleCart(false));
    navigate("/");
  };
  const cartPaymentHandler = () => {
    dispatch(toggleCart(false));
    navigate("/cart/payment");
  };

  if (!isCartVisible) {
    return null;
  }

  return (
    <dialog open>
      <article className="cart">
        <header>
          <span
            onClick={cartCloseHandler}
            role="button"
            aria-label="Close"
            className="close secondary"
          ></span>
          <div className="cart-data">
            <h5>Cart</h5>
          </div>
        </header>
        {totalItems === 0 ? (
          <p>Your Cart is empty</p>
        ) : (
          <div>
            <ul>{showCartItems}</ul>
            <span>
              You have {totalItems} items in cart. For {totalPrice}$
            </span>
          </div>
        )}

        <footer>
          <div className="cart-actions">
            <Link to="payment" role="button" onClick={cartPaymentHandler}>
              Payment
            </Link>
            <Link
              to="/"
              href="#"
              role="button"
              onClick={cartCloseHandler}
              className="secondary"
            >
              Close
            </Link>
          </div>
        </footer>
      </article>
    </dialog>
  );
};

export default Cart;
