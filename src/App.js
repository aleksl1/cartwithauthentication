import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { Suspense } from "react";
import "./App.css";
import "@picocss/pico";

import FrontPage from "./pages/FrontPage";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import LoadingSpinner from "./components/layout/LoadingSpinner";

// import ErrorPage from "./pages/ErrorPage";
// import LoginPage from "./pages/LoginPage";
// import Cart from "./components/cart/Cart";
// import LoginForm from "./components/login/LoginForm";
// import SignUpForm from "./components/login/SignUpForm";
// import ResetPassword from "./components/login/ResetPassword";
// import PaymentPage from "./pages/PaymentPage";
// import Footer from "./components/layout/Footer";
// import UserProfilePage from "./pages/UserProfilePage";
// import AuthInformation from "./components/login/AuthInformation";
// import ItemDetailsPage from "./components/items/ItemDetailsPage";
// import ContactPage from "./pages/ContactPage";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const Cart = React.lazy(() => import("./components/cart/Cart"));
const LoginForm = React.lazy(() => import("./components/login/LoginForm"));
const SignUpForm = React.lazy(() => import("./components/login/SignUpForm"));
const ResetPassword = React.lazy(() =>
  import("./components/login/ResetPassword")
);
const PaymentPage = React.lazy(() => import("./pages/PaymentPage"));
const UserProfilePage = React.lazy(() => import("./pages/UserProfilePage"));
const AuthInformation = React.lazy(() =>
  import("./components/login/AuthInformation")
);
const ItemDetailsPage = React.lazy(() =>
  import("./components/items/ItemDetailsPage")
);
const ContactPage = React.lazy(() => import("./pages/ContactPage"));

function App() {
  const isLoggedIn = useSelector((state) => state.auth.userIsLoggedIn);

  return (
    <>
      <Navigation />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<FrontPage />} />

          <Route path="/details/:productId" element={<ItemDetailsPage />} />
          <Route path="user" element={<LoginPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="cart/payment" element={<PaymentPage />} />
          <Route path="user/login" element={<LoginForm />} />
          <Route path="user/authinfo" element={<AuthInformation />} />
          <Route
            path="user/profile"
            element={
              isLoggedIn ? (
                <UserProfilePage />
              ) : (
                <ErrorPage message={`Log in to see Your profile!`} />
              )
            }
          />
          <Route
            path="user/profile/reset"
            element={isLoggedIn ? <ResetPassword /> : <FrontPage />}
          />
          <Route path="user/signup" element={<SignUpForm />} />
          <Route
            path="user/signup/terms"
            element={<ErrorPage message={`No terms at this time`} />}
          />
          <Route path="user/resend" element={<ErrorPage message={"TBD"} />} />
          <Route
            path="*"
            element={<ErrorPage message={`This path doesn't exist`} />}
          />
          <Route path="contact" element={<ContactPage />} />
        </Routes>{" "}
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
