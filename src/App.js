import { Routes, Route } from "react-router-dom";

import Navigation from "./components/layout/Navigation";
import ErrorPage from "./pages/ErrorPage";
import FrontPage from "./pages/FrontPage";
import LoginPage from "./pages/LoginPage";
import Cart from "./components/cart/Cart";
import LoginForm from "./components/login/LoginForm";
import SignUpForm from "./components/login/SignUpForm";
import ResetPassword from "./components/login/ResetPassword";
import Payment from "./components/cart/Payment";
import "./App.css";
import "@picocss/pico";
import UserProfilePage from "./pages/UserProfilePage";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.userIsLoggedIn);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="user" element={<LoginPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="cart/payment" element={<Payment />} />
        <Route path="user/login" element={<LoginForm />} />
        <Route
          path="user/profile"
          element={isLoggedIn ? <UserProfilePage /> : <ErrorPage />}
        />
        <Route path="user/signup" element={<SignUpForm />} />
        <Route path="user/signup/terms" element={<ErrorPage />} />
        <Route path="user/login/reset" element={<ResetPassword />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
