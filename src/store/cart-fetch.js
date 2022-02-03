// const DB_URL = `https://shopjs-fc7ef-default-rtdb.europe-west1.firebasedatabase.app/Carts.json`;

// export const updateUserCart = (userId, itemsInCart) => {
//   if (!userId) {
//     console.log(`cant update if user not logged in`);
//     return null;
//   }
//   fetch(
//     `https://shopjs-fc7ef-default-rtdb.europe-west1.firebasedatabase.app/Carts/${userId}.json`,
//     {
//       method: "PUT",
//       body: JSON.stringify({
//         cart: { ...itemsInCart },
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   ).catch((error) => alert(error.message));
// };

// export const loadUserCart = async (userId) => {
//   console.log(`test`);
//   const response = await fetch(
//     `https://shopjs-fc7ef-default-rtdb.europe-west1.firebasedatabase.app/Carts/${userId}.json`
//   );
//   if (!response.ok) {
//     throw new Error(`Can't load user cart`);
//   }
//   const data = await response.json();
//   console.log(data);
// };
