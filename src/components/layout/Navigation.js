import { NavLink } from "react-router-dom";

const Navigation = () => {
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
          <li>
            <NavLink to="cart">Cart</NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink role="button" className="secondary" to="user">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
