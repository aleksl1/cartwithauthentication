import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showStatusMessage } from "../store/auth-slice";
import classes from "./LoginPage.module.css";
const LoginPage = () => {
  const dispatch = useDispatch();

  const resetMessageHandler = () => {
    dispatch(
      showStatusMessage({
        message: "",
        loginStatus: "waiting",
        signUpStatus: "waiting",
      })
    );
  };

  return (
    <main className="container">
      <div className={classes["login-page"]}>
        <p>
          <small>You can login using test@test.com , password: testtest</small>
        </p>
        <p>
          <small>
            or use any valid email adress - there is no confirmation implemented
            at the moment
          </small>
        </p>
        <Link to="login">
          <button onClick={resetMessageHandler}>Login</button>
        </Link>

        <Link to="signup">
          <button>Sign up</button>
        </Link>
      </div>
    </main>
  );
};

export default LoginPage;
