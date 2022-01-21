import { login, signUp, showStatusMessage, logout } from "./auth-slice";

export const signUpNewUser = (user) => {
  const SIGNUP_KEY = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8ORI8Iftix7L_W_NkKSVUughlfaGqCgk`;
  return async (dispatch) => {
    const response = await fetch(SIGNUP_KEY, {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      dispatch(signUp({ status: "failed" }));
      const errorMessage = await response.json();
      dispatch(
        showStatusMessage({
          message: errorMessage.error.message,
          signUpStatus: "failed",
        })
      );

      throw new Error(errorMessage.error.message);
    }
    dispatch(signUp({ status: "success" }));
  };
};

export const loginNewUser = (userData) => {
  const LOGIN_KEY = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8ORI8Iftix7L_W_NkKSVUughlfaGqCgk
`;
  return async (dispatch) => {
    const response = await fetch(LOGIN_KEY, {
      method: "POST",
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorMessage = await response.json();
      dispatch(showStatusMessage({ message: errorMessage.error.message }));
      dispatch(login({ success: false, status: "failed" }));

      throw new Error(errorMessage.error.message);
    }
    const data = await response.json();
    dispatch(showStatusMessage({ message: "" }));
    dispatch(login({ success: true, userName: data.email, status: "success" }));
  };
};
