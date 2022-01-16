import { Link } from "react-router-dom";

const LoginForm = () => {
  const submitFormHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <form onSubmit={submitFormHandler} className="form">
        <label htmlFor="email">Email adress</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" min="7" max="16" />
        <button type="submit">Login</button>
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
