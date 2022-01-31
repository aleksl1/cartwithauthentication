import React from "react";
import Items from "../components/items/Items";

const FrontPage = (props) => {
  return (
    <React.Fragment>
      <div className="container introduction"></div>

      <Items />
    </React.Fragment>
  );
};

export default FrontPage;
