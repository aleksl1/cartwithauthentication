import ItemCard from "./ItemCard";
import LoadingSpinner from "../layout/LoadingSpinner";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import "./Items.css";

const Items = () => {
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    totalItems,
    totalPrice,
    items: itemsInCart,
  } = useSelector((state) => state.cart);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://shopjs-fc7ef-default-rtdb.europe-west1.firebasedatabase.app/Products.json`
      );
      if (!response.ok) {
        throw new Error("Can not load available items");
      }
      const data = await response.json();
      let itemsArr = [];
      for (const key in data) {
        itemsArr.push({
          name: data[key].title,
          id: data[key].id,
          price: data[key].price,
          description: data[key].description,
          category: data[key].category,
          image: data[key].image,
        });
      }
      setItems(itemsArr);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    if (itemsInCart.length > 0) {
      localStorage.setItem("totalItems", `${totalItems}`);
      localStorage.setItem("totalPrice", `${totalPrice}`);
      localStorage.setItem("items", `${JSON.stringify(itemsInCart)}`);
    }
  }, [totalItems, totalPrice, itemsInCart]);

  return (
    <div className="container items-display">
      {isLoading && <LoadingSpinner />}
      {errorMessage ? errorMessage : ""}
      {!errorMessage &&
        !isLoading &&
        items.map((item) => (
          <ItemCard
            id={item.id}
            key={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            category={item.category}
            image={item.image}
          />
        ))}
    </div>
  );
};

export default Items;
