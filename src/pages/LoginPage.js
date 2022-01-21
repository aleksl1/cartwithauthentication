import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showStatusMessage } from "../store/auth-slice";

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
      <div className="login-page">
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
