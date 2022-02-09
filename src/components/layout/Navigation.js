import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth-slice";
import { FaCartPlus } from "react-icons/fa";
import Logo from "./Logo";
import classes from "./Navigation.module.css";

const Navigation = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [wasToggled, setWasToggled] = useState(false);
  const cartAmount = useSelector((state) => state.cart.totalItems);
  const isLoggedIn = useSelector((state) => state.auth.userIsLoggedIn);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("totalItems");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("items");
    dispatch(logout());
  };
  const toggleMobileNavHandler = () => {
    setWasToggled(true);
    setShowMobileNav((prevState) => !prevState);
  };

  let animateValue = "";
  if (wasToggled && showMobileNav) {
    animateValue = "1";
  }
  if (wasToggled && !showMobileNav) {
    animateValue = "2";
  }
  const menuItemClickHandler = () => {
    setShowMobileNav(false);
  };

  return (
    <div className={classes["nav-container"]}>
      <div className={classes["nav-mobile"]}>
        <div
          className={classes["burger-menu"]}
          onClick={toggleMobileNavHandler}
        >
          <div className={classes["burger-top"]} animate={animateValue}></div>
          <div className={classes["burger-mid"]} animate={animateValue}></div>
          <div className={classes["burger-bot"]} animate={animateValue}></div>
        </div>
        <Logo />
        <div className={classes["cart-mobile"]}>
          <NavLink className={classes["cart-icon"]} to="cart">
            <FaCartPlus />

            {cartAmount > 0 ? (
              <span className={classes["cart-icon-number"]}>{cartAmount}</span>
            ) : null}
          </NavLink>
        </div>
      </div>
      {showMobileNav && (
        <nav className={classes["menu-mobile"]}>
          <ul
            className={classes["menu-mobile-list"]}
            onClick={menuItemClickHandler}
          >
            <li className={classes["menu-mobile-item"]}>
              <NavLink to="/">Shop</NavLink>
            </li>
            <li className={classes["menu-mobile-item"]}>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li className={classes["menu-mobile-item"]}>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li className={classes["menu-mobile-item"]}>
              <NavLink to="/user/profile">Profile</NavLink>
            </li>
            <li className={classes["menu-mobile-item"]}>
              {isLoggedIn ? (
                <NavLink to="/" onClick={logoutHandler}>
                  Logout
                </NavLink>
              ) : (
                <NavLink to="user">Login</NavLink>
              )}
            </li>
          </ul>
        </nav>
      )}
      <nav className={classes["nav-desktop"]}>
        <ul className={classes["cart-list"]}>
          <li>
            <NavLink className={classes["cart-icon"]} to="cart">
              <FaCartPlus />
              {cartAmount > 0 ? (
                <span className={classes["cart-number"]}>{cartAmount}</span>
              ) : null}
            </NavLink>
          </li>
          <li className={classes["cart-link"]}>
            <NavLink to="cart">Cart</NavLink>
          </li>
        </ul>

        <Logo />

        <ul>
          <li>
            <NavLink to="/">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink to="/user/profile">Profile</NavLink>
            </li>
          )}
          <li>
            {isLoggedIn ? (
              <NavLink to="/" onClick={logoutHandler}>
                Logout
              </NavLink>
            ) : (
              <NavLink to="user">Login</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
