import React from "react";
import Items from "../components/items/Items";
import Carousel from "../components/other/Carousel";
import classes from "./FrontPage.module.css";

const FrontPage = (props) => {
  return (
    <React.Fragment>
      <div className={classes["front-page-filters"]}>
        <Carousel />
        <Items />
      </div>
    </React.Fragment>
  );
};

export default FrontPage;
