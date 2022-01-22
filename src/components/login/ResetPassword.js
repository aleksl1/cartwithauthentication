import { useRef, useState } from "react";
import { changeUserPassword } from "../../store/auth-actions";
import { useSelector } from "react-redux";

const ResetPassword = () => {
  const useInputPasswordRef = useRef();
  const [isNewPasswordInvalid, setIsNewPasswordInvalid] = useState(false);
  const token = useSelector((state) => state.auth.authToken);
  const submitResetHandler = (e) => {
    e.preventDefault();
    setIsNewPasswordInvalid(false);
    const newPassword = useInputPasswordRef.current.value;
    if (newPassword.length < 8) {
      setIsNewPasswordInvalid(true);
      useInputPasswordRef.current.value = "";
      return;
    }
    changeUserPassword(newPassword, token);

    useInputPasswordRef.current.value = "";
  };

  return (
    <div className="container">
      <form className="form" onSubmit={submitResetHandler}>
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={useInputPasswordRef}
        />
        {isNewPasswordInvalid && <small>this password is invalid</small>}
        <button type="submit">Reset password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
