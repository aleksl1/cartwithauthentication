import { login, signUp, showStatusMessage } from "./auth-slice";
import { createNewUserCart } from "./cart-fetch";
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
    // createNewUserCart(user.email);
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
      dispatch(
        showStatusMessage({
          message: errorMessage.error.message,
          loginStatus: "failed",
        })
      );
      // dispatch(login({ success: false, status: "failed" }));

      throw new Error(errorMessage.error.message);
    }
    const data = await response.json();
    dispatch(showStatusMessage({ message: "", loginStatus: "success" }));
    dispatch(
      login({
        userName: data.email,
        token: data.idToken,
        userId: data.localId,
      })
    );
    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userName", data.email);
    localStorage.setItem("userId", data.localId);
  };
};

export const changeUserPassword = async (newPassword, authToken) => {
  const CHANGE_PASSWORD_KEY = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA8ORI8Iftix7L_W_NkKSVUughlfaGqCgk`;
  try {
    const response = await fetch(CHANGE_PASSWORD_KEY, {
      method: "POST",
      body: JSON.stringify({
        idToken: authToken,
        password: newPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Password change failed");
    }
    alert("Password change successfull");
  } catch (error) {
    alert(error);
  }
};
