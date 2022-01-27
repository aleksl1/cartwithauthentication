// const DB_URL = `https://shopjs-fc7ef-default-rtdb.europe-west1.firebasedatabase.app/Carts.json`;

export const updateUserCart = (userId, itemsInCart) => {
  if (!userId) {
    return null;
  }
  fetch(
    `https://shopjs-fc7ef-default-rtdb.europe-west1.firebasedatabase.app/Carts/${userId}.json`,
    {
      method: "PUT",
      body: JSON.stringify({
        cart: { ...itemsInCart },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).catch((error) => alert(error.message));
};

export const loadUserCart = (userId) => {
  fetch(
    `https://shopjs-fc7ef-default-rtdb.europe-west1.firebasedatabase.app/Carts/${userId}.json`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Cant load user cart");
      } else {
        return response.json();
      }
    })
    .catch((error) => console.log(error.message));
};
