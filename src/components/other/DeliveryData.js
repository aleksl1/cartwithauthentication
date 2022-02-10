import classes from "./DeliveryData.module.css";

const DeliveryData = (props) => {
  return (
    <>
      {props.userName ? (
        <p>
          <span className={classes["load-data-btn"]}>
            Use Your profile data
          </span>{" "}
          or enter new address below:{" "}
        </p>
      ) : (
        <p>Please, provide us with information, required for delivery: </p>
      )}
      <div>
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="house" placeholder="St.number" />
        <input type="text" name="city" placeholder="City" />
        <input type="text" name="zip-code" placeholder="Zip Code" />
        <input type="text" name="email" placeholder="email@adress.com" />
        <div className={classes.checkbox}>
          <div className={classes["box-label"]}>
            <label htmlFor="">Deliver with:</label>
          </div>
          <div className={classes["checkbox-option"]}>
            <label htmlFor="deliveryOption1">Post Office</label>
            <input
              type="radio"
              name="delivery"
              value="postOffice"
              id="deliveryOption1"
            />
          </div>
          <div className={classes["checkbox-option"]}>
            <label htmlFor="deliveryOption2">UPS Delivery</label>
            <input
              type="radio"
              name="delivery"
              value="upsDelivery"
              id="deliveryOption2"
            />
          </div>
          <div className={classes["checkbox-option"]}>
            <label htmlFor="deliveryOption3">Pick up</label>
            <input
              type="radio"
              name="delivery"
              value="pickUp"
              id="deliveryOption3"
            />
          </div>
        </div>
        <p>
          <small>no validation at the moment</small>
        </p>
      </div>
    </>
  );
};

export default DeliveryData;
