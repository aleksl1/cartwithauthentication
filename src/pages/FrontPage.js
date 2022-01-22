import React from "react";
import Items from "../components/Items";

const FrontPage = (props) => {
  return (
    <React.Fragment>
      <div className="container introduction">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa,
          fugiat! Quos praesentium, vero voluptatem eius quaerat eum, ea fuga
          laborum sed facere ut optio deserunt.
        </p>
      </div>
      <div className="container items-display">
        <Items />
      </div>
    </React.Fragment>
  );
};

export default FrontPage;
