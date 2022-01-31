import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../store/cart-slice";
import { Link } from "react-router-dom";
import { loadUserCart, updateUserCart } from "../../store/cart-fetch";
import CartItem from "./CartItem";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCartVisible = useSelector((state) => state.cart.isVisible);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cartItems = useSelector((state) => state.cart.items);
  const userId = useSelector((state) => state.auth.userId);
  const userName = useSelector((state) => state.auth.userName);
  useEffect(() => {
    dispatch(toggleCart(true));
    loadUserCart(userId);
  }, [dispatch, userId]);

  const updateCartInBrowserStorage = useCallback(() => {
    localStorage.setItem("totalItems", `${totalItems}`);
    localStorage.setItem("totalPrice", `${totalPrice}`);
    localStorage.setItem("items", `${JSON.stringify(cartItems)}`);
  }, [totalItems, totalPrice, cartItems]);

  useEffect(() => {
    updateCartInBrowserStorage();
  }, [updateCartInBrowserStorage]);

  const showCartItems = cartItems.map((item) => (
    <CartItem
      key={item.id}
      id={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      image={item.image}
      updateCart={updateCartInBrowserStorage}
    />
  ));

  const cartCloseHandler = () => {
    dispatch(toggleCart(false));
    navigate("/");
    updateUserCart(userId, cartItems);
  };
  const cartPaymentHandler = () => {
    dispatch(toggleCart(false));
    navigate("/cart/payment");
    updateUserCart(userId, cartItems);
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
            <h5>{userName ? `Cart of ${userName}` : "Cart"}</h5>
          </div>
        </header>
        {totalItems === 0 ? (
          <p>Your Cart is empty</p>
        ) : (
          <div className="container">
            <div className="cart-items-container">{showCartItems}</div>
            <span>
              You have {totalItems} items in cart. For {totalPrice.toFixed(2)}$
            </span>
          </div>
        )}

        <footer>
          <div className="cart-actions">
            <Link
              disabled={totalItems === 0 ? true : false}
              to="payment"
              role="button"
              onClick={cartPaymentHandler}
            >
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
