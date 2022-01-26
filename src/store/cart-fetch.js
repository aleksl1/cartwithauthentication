// const DB_URL = `https://shopjs-fc7ef-default-rtdb.europe-west1.firebasedatabase.app/Carts.json`;

// export const fetchCartItems = () => {};

// export const sendCartItems = async (item) => {
//   const response = await fetch(DB_URL, {
//     method: "POST",
//     body: JSON.stringify({
//       name: item.name,
//       id: item.id,
//       amount: item.amount,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   return response.json();
// };

const checkIfCartExists = async (userId) => {
  fetch(
    `https://shopjs-fc7ef-default-rtdb.europe-west1.firebasedatabase.app/Carts/${userId}.json`
  ).then((response) => {
    if (!response.ok) {
      return false;
    } else {
      return true;
    }
  });
};

export const updateUserCart = (userId, itemsInCart) => {
  console.log(`update cart`);
  if (!userId) {
    return null;
  }
  // if (userId) {
  //   const cartExists = checkIfCartExists(userId);
  //   if(cartExists) {

  //   }
  // }

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
  console.log(`load cart`);
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
    .then((data) => console.log(data));
};
