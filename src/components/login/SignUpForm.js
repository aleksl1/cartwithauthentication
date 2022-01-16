const SignUpForm = () => {
  return (
    <div className="container">
      <form className="form">
        <label htmlFor="name">Name</label>
        <input type="name" id="name" name="name" />
        <label htmlFor="email">Email adress</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <label htmlFor="password">Repeat password</label>
        <input type="repeat" id="repeat" name="repeat" />
        <label htmlFor="terms">
          <input type="checkbox" id="terms" name="terms" />I agree to the Terms
          and Conditions
        </label>
        <label htmlFor="terms_sharing">
          <input
            type="checkbox"
            id="terms_sharing"
            name="terms_sharing"
          ></input>
          I agree to share my information with partners
        </label>{" "}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
