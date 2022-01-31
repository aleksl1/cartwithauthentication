import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showStatusMessage } from "../../store/auth-slice";
import LoadingSpinner from "../layout/LoadingSpinner";

const AuthInformation = () => {
  const location = useLocation();
  const loggedUserName = useSelector((state) => state.auth.userName);
  const signUpStatus = useSelector((state) => state.auth.signUpStatus);
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const message = useSelector((state) => state.auth.statusMessage);
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

  const loginSuccesMsg = location.state.action === "Login" && (
    <article>
      <div>
        <p>{loggedUserName}</p>
        <p>Login was successfull</p>
        <small>
          <Link onClick={resetMessageHandler} to="/">
            Start browsing our store!
          </Link>
        </small>
      </div>
    </article>
  );
  const loginFailedMsg = location.state.action === "Login" && (
    <article>
      <div>
        <p>Login failed{message && `, reason: ${message}`}</p>
        <small>
          <Link onClick={resetMessageHandler} to="/user/login">
            Try logging in again!
          </Link>
        </small>
      </div>
    </article>
  );
  const signUpSuccessMsg = location.state.action === "SignUp" && (
    <article>
      <div>
        <p>Created new account</p>
        <small>
          <Link onClick={resetMessageHandler} to="/user/login">
            You can login here!
          </Link>
        </small>
      </div>
    </article>
  );

  const signUpFailedMsg = location.state.action === "SignUp" && (
    <article>
      <div>
        <p>Failed to create an account{message && `, reason: ${message}`}</p>
        <small>
          <Link onClick={resetMessageHandler} to="/user/signup">
            Try again here!
          </Link>
        </small>
      </div>
    </article>
  );
  return (
    <div className="container">
      {loginStatus === "success" && loginSuccesMsg}
      {loginStatus === "failed" && loginFailedMsg}
      {location.state.action === "Login" && loginStatus === "waiting" && (
        <LoadingSpinner />
      )}
      {signUpStatus === "success" && signUpSuccessMsg}
      {signUpStatus === "failed" && signUpFailedMsg}
      {location.state.action === "SignUp" && signUpStatus === "waiting" && (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default AuthInformation;
