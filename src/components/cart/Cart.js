import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../store/cart-slice";
import CartItem from "./CartItem";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCartVisible = useSelector((state) => state.cart.isVisible);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cartItems = useSelector((state) => state.cart.items);
  const userName = useSelector((state) => state.auth.userName);

  useEffect(() => {
    dispatch(toggleCart(true));
  }, [dispatch]);

  const updateCartInBrowserStorage = useCallback(() => {
    if (totalItems !== 0) {
      localStorage.setItem("totalItems", `${totalItems}`);
      localStorage.setItem("totalPrice", `${totalPrice.toFixed(2)}`);
      localStorage.setItem("items", `${JSON.stringify(cartItems)}`);
    } else if (totalItems === 0) {
      localStorage.removeItem("totalItems");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("items");
    }
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
      inCart={true}
    />
  ));

  const cartCloseHandler = () => {
    dispatch(toggleCart(false));
    navigate(-1);
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
            <button
              className="cart-actions-btn"
              disabled={totalItems === 0 ? true : false}
              onClick={cartPaymentHandler}
            >
              Payment
            </button>
            <button
              onClick={cartCloseHandler}
              className="secondary cart-actions-btn"
            >
              Close
            </button>
          </div>
        </footer>
      </article>
    </dialog>
  );
};

export default Cart;
