import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth-slice";

const Navigation = () => {
  const cartAmount = useSelector((state) => state.cart.totalItems);
  const isLoggedIn = useSelector((state) => state.auth.userIsLoggedIn);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
  };

  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <strong>Super Store</strong>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="cart-number-container">
            <NavLink to="cart">Cart</NavLink>
            {cartAmount > 0 ? (
              <span className="cart-number">{cartAmount}</span>
            ) : null}
          </li>
        </ul>
        <ul>
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
              <NavLink role="button" className="secondary outline" to="user">
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
