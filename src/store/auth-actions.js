// import { login } from "./auth-slice";
// import { useDispatch } from "react-redux";

const SIGNUP_KEY = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8ORI8Iftix7L_W_NkKSVUughlfaGqCgk`;
const LOGIN_KEY = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8ORI8Iftix7L_W_NkKSVUughlfaGqCgk
`;

export const signUpNewUser = (user, responseData) => {
  fetch(SIGNUP_KEY, {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(`OK`);
        return response.json();
      } else {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
    });
};

export const loginNewUser = (user) => {
  console.log(`logging in`);
  fetch(LOGIN_KEY, {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      throw new Error("Login failed");
    });
};
