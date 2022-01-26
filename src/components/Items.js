import ItemCard from "../components/ItemCard";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useState, useCallback } from "react";

const DB_URL = `https://shopjs-fc7ef-default-rtdb.europe-west1.firebasedatabase.app/Items.json`;

const Items = () => {
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    console.log(`fetch items`);
    setIsLoading(true);
    try {
      const response = await fetch(DB_URL);
      if (!response.ok) {
        throw new Error("Can not load available items");
      }
      const data = await response.json();
      let itemsArr = [];
      for (const key in data) {
        itemsArr.push({
          name: data[key].name,
          id: data[key].id,
          price: data[key].price,
          description: data[key].description,
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

  return (
    <>
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
          />
        ))}
    </>
  );
};

export default Items;
