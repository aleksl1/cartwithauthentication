import ItemCard from "./ItemCard";
import LoadingSpinner from "../layout/LoadingSpinner";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setItems } from "../../store/items-slice";
import classes from "./Items.module.css";

const numberOfItemsOnPage = 8;

const Items = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeItemsPage, setActiveItemsPage] = useState(1);
  const [itemsPages, setItemPages] = useState();
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

  const splitItemsIntoPages = useCallback(
    (pageLength, itemsLength) => {
      const pages = [];
      const numberOfPages = Math.ceil(itemsLength / pageLength);
      for (let i = 0; i < numberOfPages; i++) {
        pages.push([]);
      }
      for (let i = 0; i < numberOfPages; i++) {
        for (let j = pageLength * i; j < pageLength * (i + 1); j++) {
          if (!items[j]) {
            break;
          }
          pages[i].push(items[j]);
        }
      }
      setItemPages([...pages]);
    },
    [items]
  );
  useEffect(() => {
    splitItemsIntoPages(numberOfItemsOnPage, items.length);
  }, [items, splitItemsIntoPages]);

  const displayedItems =
    itemsPages && itemsPages[0]
      ? itemsPages[activeItemsPage - 1].map((item) => (
          <ItemCard
            id={item.id}
            key={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            category={item.category}
            image={item.image}
          />
        ))
      : null;

  const pageChangeHandler = (e) => {
    setActiveItemsPage(e.target.textContent);
  };

  const pagePagination =
    itemsPages && itemsPages[0] ? (
      <div className={classes.pagination} data-active={activeItemsPage}>
        {[...Array(itemsPages.length)].map((page, index) =>
          +activeItemsPage === +(index + 1) ? (
            <span
              className={classes["active-page"]}
              key={index}
              onClick={pageChangeHandler}
            >
              {index + 1}
            </span>
          ) : (
            <span key={index} onClick={pageChangeHandler}>
              {index + 1}
            </span>
          )
        )}
      </div>
    ) : null;

  return (
    <div className="container">
      {pagePagination}
      <div className={classes["items-display"]}>
        {isLoading && <LoadingSpinner />}
        {errorMessage ? errorMessage : ""}
        {!errorMessage && !isLoading && displayedItems}
      </div>
      {pagePagination}
    </div>
  );
};

export default Items;
