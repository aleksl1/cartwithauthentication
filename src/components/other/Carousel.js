import classes from "./Carousel.module.css";
import { useSelector } from "react-redux";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { useState } from "react";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const initialFeaturedIndex = {
  first: 0,
  second: 1,
  third: 2,
};

const Carousel = () => {
  const items = useSelector((state) => state.items.items);
  const [featuredIndex, setFeaturedIndex] = useState(initialFeaturedIndex);
  const navigate = useNavigate();

  const carouselRightHandler = useCallback(() => {
    if (items[featuredIndex.third].id < items.length) {
      setFeaturedIndex((prevState) => ({
        first: prevState.first + 1,
        second: prevState.second + 1,
        third: prevState.third + 1,
      }));
    } else {
      setFeaturedIndex(initialFeaturedIndex);
    }
  }, [featuredIndex, items]);

  const carouselLeftHandler = () => {
    if (items[featuredIndex.first].id === 1) {
      setFeaturedIndex({
        first: items.length - 3,
        second: items.length - 2,
        third: items.length - 1,
      });
    } else {
      setFeaturedIndex((prevState) => ({
        first: prevState.first - 1,
        second: prevState.second - 1,
        third: prevState.third - 1,
      }));
    }
  };

  useEffect(() => {
    const intervalIndex = setInterval(() => {
      carouselRightHandler();
    }, 5000);

    return () => {
      clearInterval(intervalIndex);
    };
  }, [carouselRightHandler]);

  const showItemDetailsHandler = (e) => {
    navigate(`/details/:${e.currentTarget.dataset.id}`);
  };

  return (
    <div className={classes["carousel-container"]}>
      {items.length && (
        <>
          <div
            className={classes["carousel-left-arrow"]}
            onClick={carouselLeftHandler}
          >
            <FaArrowCircleLeft
              className={classes["carousel-left-arrow-icon"]}
            />
          </div>
          <div className={classes.carousel}>
            <div
              key={items[featuredIndex.first].id}
              className={classes["carousel-item"]}
              onClick={showItemDetailsHandler}
              data-id={items[featuredIndex.first].id}
            >
              <img
                src={items[featuredIndex.first].image}
                alt={items[featuredIndex.first].name}
              />
            </div>
            <div
              key={items[featuredIndex.second].id}
              className={classes["carousel-item"]}
              onClick={showItemDetailsHandler}
              data-id={items[featuredIndex.second].id}
            >
              <img
                src={items[featuredIndex.second].image}
                alt={items[featuredIndex.second].name}
              />
            </div>
            <div
              key={items[featuredIndex.third].id}
              className={classes["carousel-item"]}
              onClick={showItemDetailsHandler}
              data-id={items[featuredIndex.third].id}
            >
              <img
                src={items[featuredIndex.third].image}
                alt={items[featuredIndex.third].name}
              />
            </div>
          </div>
          <div className={classes["mobile-carousel"]}>
            <div
              key={items[featuredIndex.first].id}
              data-id={items[featuredIndex.first].id}
              className={classes["mobile-carousel-item"]}
              onClick={showItemDetailsHandler}
            >
              <img
                src={items[featuredIndex.first].image}
                alt={items[featuredIndex.first].name}
              />
            </div>
          </div>
          <div
            className={classes["carousel-right-arrow"]}
            onClick={carouselRightHandler}
          >
            <FaArrowCircleRight
              className={classes["carousel-right-arrow-icon"]}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
