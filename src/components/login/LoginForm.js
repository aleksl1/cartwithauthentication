import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="container">
      <form className="form">
        <label htmlFor="email">Email adress</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Login</button>
        <small>
          <Link to="reset">Forgot your password?</Link>
        </small>
      </form>
    </div>
  );
};

export default LoginForm;
