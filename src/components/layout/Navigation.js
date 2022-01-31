import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth-slice";
import "./Navigation.css";
import { FaCartPlus } from "react-icons/fa";
import Logo from "./Logo";

const Navigation = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [wasToggled, setWasToggled] = useState(false);
  const cartAmount = useSelector((state) => state.cart.totalItems);
  const isLoggedIn = useSelector((state) => state.auth.userIsLoggedIn);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
  };
  const toggleMobileNavHandler = () => {
    console.log(`set`);
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

  return (
    <div className="nav-container">
      <div className="nav-mobile">
        <div className="burger-menu" onClick={toggleMobileNavHandler}>
          <div className="burger-top" animate={animateValue}></div>
          <div className="burger-mid" animate={animateValue}></div>
          <div className="burger-bot" animate={animateValue}></div>
        </div>
        <Logo />
        <div className="cart-mobile">
          <NavLink className="cart-icon" to="cart">
            <FaCartPlus />

            {cartAmount > 0 ? (
              <span className="cart-icon-number">{cartAmount}</span>
            ) : null}
          </NavLink>
        </div>
      </div>
      {showMobileNav && (
        <nav className="menu-mobile">
          <ul className="menu-mobile-list">
            <li className="menu-mobile-item">
              <NavLink to="/">Shop</NavLink>
            </li>
            <li className="menu-mobile-item">
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li className="menu-mobile-item">
              <NavLink to="/user/profile">Profile</NavLink>
            </li>
            <li className="menu-mobile-item">Logout</li>
          </ul>
        </nav>
      )}
      <nav className="nav-desktop">
        <ul>
          <li className="cart-number-container">
            <NavLink to="cart">Cart</NavLink>
            {cartAmount > 0 ? (
              <span className="cart-number">{cartAmount}</span>
            ) : null}
          </li>
        </ul>
        <div className="desktop-logo-container">
          <Logo />
        </div>
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
