import React from "react";
import Items from "../components/items/Items";
import classes from "./FrontPage.module.css";

const FrontPage = (props) => {
  return (
    <React.Fragment>
      <div className={classes["front-page-filters"]}>
        <Items />
      </div>
    </React.Fragment>
  );
};

export default FrontPage;
