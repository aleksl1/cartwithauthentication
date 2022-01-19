import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginNewUser } from "../../store/auth-actions";
import { login } from "../../store/auth-slice";

const LoginForm = () => {
  const [isFormInvalid, setIsFormInvalid] = useState(true);
  const navigate = useNavigate();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const dispatch = useDispatch();
  const loggedUserName = useSelector((state) => state.auth.userName);
  // const isLoggedIn = useSelector(state=>state.auth.userIsLoggedIn)

  const inputEmailHandler = (e) => {
    inputEmailRef.current.value = e.target.value;
    if (inputPasswordRef.current.value) {
      setIsFormInvalid(false);
    }
  };
  const inputPasswordHandler = (e) => {
    inputPasswordRef.current.value = e.target.value;
    if (inputEmailRef.current.value) {
      setIsFormInvalid(false);
    }
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (!inputEmailRef.current.value || !inputPasswordRef.current.value) {
      return null;
    } else {
      dispatch(
        loginNewUser({
          email: inputEmailRef.current.value,
          password: inputPasswordRef.current.value,
        })
      );
      navigate("/user/authinfo", {
        state: { action: "Login" },
      });
    }
  };

  return (
    <div className="container">
      <form onSubmit={submitFormHandler} className="form">
        <label htmlFor="email">Email adress</label>
        <input
          type="email"
          id="email"
          name="email"
          ref={inputEmailRef}
          onChange={inputEmailHandler}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          min="7"
          max="16"
          ref={inputPasswordRef}
          onChange={inputPasswordHandler}
        />
        <button type="submit" disabled={isFormInvalid ? true : false}>
          Login
        </button>
        {/* <p>
          {isFormInvalid && (
            <small className="invalid">Missing login data</small>
          )}
        </p> */}
        <small>
          <Link to="reset">Forgot your password?</Link>
        </small>
        <p>
          <small>
            <Link to="/user/signup">Don't have an account?</Link>
          </small>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
