const DB_URL = `https://shopjs-fc7ef-default-rtdb.europe-west1.firebasedatabase.app/cart.json`;

export const fetchCartItems = () => {};

export const sendCartItems = async (item) => {
  const response = await fetch(DB_URL, {
    method: "POST",
    body: JSON.stringify({
      name: item.name,
      id: item.id,
      amount: item.amount,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
