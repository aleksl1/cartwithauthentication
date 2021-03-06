import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUpNewUser } from "../../store/auth-actions";
import classes from "./Form.module.css";

const SignUpForm = () => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);
  const [passwordBlur, setPasswordBlur] = useState(false);
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const checkboxValueRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputEmailHandler = (e) => {
    setEmailBlur(false);
    inputEmailRef.current.value = e.target.value;
  };

  const emailBlurHandler = () => {
    setEmailBlur(true);
  };
  const passwordBlurHandler = () => {
    setPasswordBlur(true);
  };
  const inputPasswordHandler = (e) => {
    setPasswordBlur(false);
    inputPasswordRef.current.value = e.target.value;
  };
  const termsCheckHandler = (e) => {
    checkboxValueRef.current.value = e.target.checked;
    setIsTermsChecked((prevState) => !prevState);
  };

  const validateEmail = () => {
    if (!inputEmailRef.current.value.includes("@")) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };

  const validatePassword = () => {
    if (inputPasswordRef.current.value.length < 8) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  };

  useEffect(() => {
    if (emailBlur) {
      validateEmail();
    }
    if (passwordBlur) {
      validatePassword();
    }
  }, [emailBlur, passwordBlur]);

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (
      inputEmailRef.current.value.includes("@") &&
      inputPasswordRef.current.value.length > 7
    ) {
      dispatch(
        signUpNewUser({
          email: inputEmailRef.current.value,
          password: inputPasswordRef.current.value,
        })
      );
      navigate("/user/authinfo", {
        state: { action: "SignUp" },
      });
    }
  };

  return (
    <div className="container">
      <form onSubmit={submitFormHandler} className={classes.form}>
        <label htmlFor="email">Email adress</label>
        <input
          type="email"
          id="email"
          name="email"
          ref={inputEmailRef}
          onChange={inputEmailHandler}
          onBlur={emailBlurHandler}
        />
        {!isEmailValid && emailBlur && (
          <small className="invalid">Please enter valid email adress</small>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={inputPasswordRef}
          onChange={inputPasswordHandler}
          onBlur={passwordBlurHandler}
        />
        {!isPasswordValid && passwordBlur && (
          <small className="invalid">
            Please enter valid password at least 8 characters
          </small>
        )}
        <small>
          <Link to="terms">Read terms and conditions here</Link>
        </small>
        <label htmlFor="terms">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            ref={checkboxValueRef}
            onChange={termsCheckHandler}
          />
          I agree to the Terms and Conditions
        </label>
        {!isTermsChecked && (
          <small>You need to agree to terms and conditions</small>
        )}

        <button
          disabled={
            isEmailValid && isTermsChecked && isPasswordValid ? false : true
          }
          type="submit"
        >
          Create an Account
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
