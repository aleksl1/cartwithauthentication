import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <main className="container">
      <div className="login-page">
        <Link to="login">
          <button>Login</button>
        </Link>

        <Link to="signup">
          <button>Sign up</button>
        </Link>
      </div>
    </main>
  );
};

export default LoginPage;
