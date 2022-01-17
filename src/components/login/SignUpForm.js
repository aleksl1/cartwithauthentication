import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// const SIGNUP_KEY = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8ORI8Iftix7L_W_NkKSVUughlfaGqCgk`;

const SignUpForm = () => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const [emailBlur, setEmailBlur] = useState(false);
  const [passwordBlur, setPasswordBlur] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const checkboxValueRef = useRef();
  const navigate = useNavigate();

  // const signUpNewUser = (user) => {
  //   fetch(SIGNUP_KEY, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       email: user.email,
  //       password: user.password,
  //       returnSecureToken: true,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log(`OK`);
  //         return response.json();
  //       } else {
  //         return response.json();
  //       }
  //     })
  //     .then((data) => {
  //       if (data.error) {
  //         setErrorMessage(data.error.message);
  //       } else {
  //         console.log(data);
  //       }
  //     });
  // };

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
      // signUpNewUser({
      //   email: inputEmailRef.current.value,
      //   password: inputPasswordRef.current.value,
      // });
      navigate("/user/login");
    }
    inputEmailRef.current.value = "";
    inputPasswordRef.current.value = "";
    checkboxValueRef.current.value = false;
  };
  // if (errorMessage) {
  //   return <p>{errorMessage}</p>;
  // }

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
          onBlur={emailBlurHandler}
        />
        {!isEmailValid && (
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
        {!isPasswordValid && (
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

        <button type="submit">Create an Account</button>
      </form>
    </div>
  );
};

export default SignUpForm;
