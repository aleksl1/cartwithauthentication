import React from "react";
import Items from "../components/items/Items";

const FrontPage = (props) => {
  return (
    <React.Fragment>
      <div className="front-page-background">
        <div className="front-page-filters">
          <Items />
        </div>
      </div>
    </React.Fragment>
  );
};

export default FrontPage;
