import { useRef, useState } from "react";
import { changeUserPassword } from "../../store/auth-actions";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Form.module.css";

const ResetPassword = () => {
  const useInputPasswordRef = useRef();
  const [isNewPasswordInvalid, setIsNewPasswordInvalid] = useState(false);
  const token = useSelector((state) => state.auth.authToken);
  const dispatch = useDispatch();
  const submitResetHandler = (e) => {
    e.preventDefault();
    setIsNewPasswordInvalid(false);
    const newPassword = useInputPasswordRef.current.value;
    if (newPassword.length < 8) {
      setIsNewPasswordInvalid(true);
      useInputPasswordRef.current.value = "";
      return;
    }
    // dispatch(changeUserPassword(newPassword, token));
    useInputPasswordRef.current.value = "";
  };

  return (
    <div className="container">
      <form className={classes.form} onSubmit={submitResetHandler}>
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={useInputPasswordRef}
        />
        {isNewPasswordInvalid && <small>this password is invalid</small>}
        <button disabled type="submit">
          Reset password
        </button>
        <small>Option disabled for convenience purposes :)</small>
      </form>
    </div>
  );
};

export default ResetPassword;
