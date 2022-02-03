import ItemCard from "./ItemCard";
import LoadingSpinner from "../layout/LoadingSpinner";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setItems } from "../../store/items-slice";
import "./Items.css";

const Items = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const {
    totalItems,
    totalPrice,
    items: itemsInCart,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    if (items.length === 0) {
      const fetchItems = async () => {
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
          dispatch(setItems(itemsArr));
        } catch (error) {
          setErrorMessage(error.message);
        }

        setIsLoading(false);
      };
      fetchItems();
    }
    return () => {};
  }, [dispatch, items]);

  useEffect(() => {
    if (itemsInCart.length > 0) {
      localStorage.setItem("totalItems", `${totalItems}`);
      localStorage.setItem("totalPrice", `${totalPrice.toFixed(2)}`);
      localStorage.setItem("items", `${JSON.stringify(itemsInCart)}`);
    }
    return () => {};
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
