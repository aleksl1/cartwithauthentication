import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// const user = {name: 'aleks', email: 'test@test.com', password:'12345678', repeat: '12345678'}

const SignUpForm = () => {
  // const [newUserData, setNewUserData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   userCart: [],
  // });
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [nameBlur, setNameBlur] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);
  const [passwordBlur, setPasswordBlur] = useState(false);
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const checkboxValueRef = useRef();
  const navigate = useNavigate();

  const inputNameHandler = (e) => {
    setNameBlur(false);
    inputNameRef.current.value = e.target.value;
  };

  const inputEmailHandler = (e) => {
    setEmailBlur(false);
    inputEmailRef.current.value = e.target.value;
  };
  const nameBlurHandler = () => {
    setNameBlur(true);
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

  const validateName = () => {
    if (inputNameRef.current.value.length < 5) {
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
    }
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
    if (nameBlur) {
      validateName();
    }
    if (emailBlur) {
      validateEmail();
    }
    if (passwordBlur) {
      validatePassword();
    }
  }, [emailBlur, passwordBlur, nameBlur]);

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (
      inputNameRef.current.value.length > 4 &&
      inputEmailRef.current.value.includes("@") &&
      inputPasswordRef.current.value.length > 8
    ) {
      const newUserData = {
        name: inputNameRef.current.value,
        email: inputEmailRef.current.value,
        password: inputPasswordRef.current.value,
        userCart: [],
      };
      // sendFormData(newUserData);
      navigate("/user/login");
    }
    inputNameRef.current.value = "";
    inputEmailRef.current.value = "";
    inputPasswordRef.current.value = "";
    checkboxValueRef.current.value = false;
  };

  return (
    <div className="container">
      <form onSubmit={submitFormHandler} className="form">
        <label htmlFor="name">Name</label>
        <input
          type="name"
          id="name"
          name="name"
          ref={inputNameRef}
          onChange={inputNameHandler}
          onBlur={nameBlurHandler}
        />
        {!isNameValid && (
          <small className="invalid">
            Name must be longer than 4 characters
          </small>
        )}
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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
