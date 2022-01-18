import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AuthInformation = () => {
  const location = useLocation();

  return (
    <div className="container">
      {location.state.action === "Login" && location.state.success && (
        <article>
          <div>
            <p>Login was successfull</p>
            <small>
              <Link to="/">Start browsing our store!</Link>
            </small>
          </div>
        </article>
      )}
      {location.state.action === "Login" && !location.state.success && (
        <article>
          <div>
            <p>Login failed</p>
            <small>
              <Link to="/user/login">Try logging in again!</Link>
            </small>
          </div>
        </article>
      )}
      {location.state.action === "SignUp" && location.state.success && (
        <article>
          <div>
            <p>Created new account</p>
            <small>
              <Link to="/user/login">You can login here!</Link>
            </small>
          </div>
        </article>
      )}
      {location.state.action === "SignUp" && !location.state.success && (
        <article>
          <div>
            <p>Failed to create an account</p>
            <small>
              <Link to="/user/signup">Try again here!</Link>
            </small>
          </div>
        </article>
      )}
    </div>
  );
};

export default AuthInformation;